/**
 * Pantry Watch — backend (Google Apps Script + Google Sheet + Google Drive)
 *
 * Every cleaning entry is one row in the "Logs" sheet. Photos and videos go
 * into a Drive folder called "Saaf Paani Media", viewable by anyone with the link.
 *
 * GET  ?action=list[&hostel=boys&floor=3]                     -> { ok, entries }   (public)
 * POST { pin, action: "checkPin" }                             -> { ok }            (staff)
 * POST { pin, action: "upload", hostel, floor, mimeType, data } -> { ok, id, type }  (staff)
 * POST { pin, hostel, floor, types[], date, name, witness, media[] } -> { ok }      (staff)
 *
 * Setup steps are in the README.
 */

const SHEET_NAME = 'Logs';
const HEADERS = ['id', 'loggedAt', 'hostel', 'floor', 'type', 'date', 'name', 'witness', 'media'];
const HOSTELS = ['boys', 'girls'];
const TYPES = ['filter', 'dispenser', 'jar', 'fridge'];
const FLOORS = 10;
const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
const MAX_MEDIA = 6;

/** Run once from the editor: creates the sheet, the media folder and a default PIN. */
function setup() {
  const sh = sheet_();
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange('F:F').setNumberFormat('@'); // keep dates as plain text
  } else if (sh.getRange(1, HEADERS.length).getValue() !== 'media') {
    sh.getRange(1, HEADERS.length).setValue('media');
  }
  mediaFolder_();
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('STAFF_PIN')) props.setProperty('STAFF_PIN', '2580');
  Logger.log('Ready. Staff PIN is: ' + props.getProperty('STAFF_PIN'));
}

/** Run from the editor after editing the value below, to change the staff PIN. */
function changePin() {
  const NEW_PIN = '2580';
  PropertiesService.getScriptProperties().setProperty('STAFF_PIN', NEW_PIN);
  Logger.log('Staff PIN changed to: ' + NEW_PIN);
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  const entries = readRows_().filter(r =>
    (!p.hostel || r.hostel === p.hostel) &&
    (!p.floor || String(r.floor) === String(p.floor)));
  return json_({ ok: true, entries: entries });
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: 'bad_json' }); }

  const pinState = checkPin_(body.pin);
  if (pinState !== 'ok') return json_({ ok: false, error: pinState });

  if (body.action === 'checkPin') return json_({ ok: true });

  const hostel = String(body.hostel || '');
  const floor = Number(body.floor);
  if (HOSTELS.indexOf(hostel) < 0) return json_({ ok: false, error: 'bad_hostel' });
  if (!(floor >= 1 && floor <= FLOORS)) return json_({ ok: false, error: 'bad_floor' });

  if (body.action === 'upload') return upload_(body, hostel, floor);

  const types = Array.isArray(body.types) ? body.types.filter(t => TYPES.indexOf(t) >= 0) : [];
  const date = String(body.date || '');
  if (!types.length) return json_({ ok: false, error: 'bad_type' });
  if (!validDate_(date)) return json_({ ok: false, error: 'bad_date' });
  const media = (Array.isArray(body.media) ? body.media : [])
    .filter(m => m && /^[\w-]{10,100}$/.test(String(m.id)) && (m.type === 'image' || m.type === 'video'))
    .slice(0, MAX_MEDIA)
    .map(m => ({ id: String(m.id), type: m.type }));

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet_();
    const now = new Date().toISOString();
    types.forEach(type => {
      sh.appendRow([Utilities.getUuid(), now, hostel, floor, type, "'" + date,
        clean_(body.name), clean_(body.witness), media.length ? JSON.stringify(media) : '']);
    });
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

/* ---------- helpers ---------- */

// Slows down PIN guessing: after 30 wrong tries in 10 minutes, everything is refused for 10 minutes.
function checkPin_(pin) {
  const cache = CacheService.getScriptCache();
  const fails = Number(cache.get('pin_fails') || 0);
  if (fails >= 30) return 'locked';
  const real = PropertiesService.getScriptProperties().getProperty('STAFF_PIN');
  if (real && String(pin) === real) return 'ok';
  cache.put('pin_fails', String(fails + 1), 600);
  return 'bad_pin';
}

function upload_(b, hostel, floor) {
  const mime = String(b.mimeType || '').toLowerCase();
  if (!/^(image|video)\/[\w.+-]+$/.test(mime)) return json_({ ok: false, error: 'bad_media' });
  let bytes;
  try { bytes = Utilities.base64Decode(String(b.data || '')); } catch (err) { return json_({ ok: false, error: 'bad_media' }); }
  if (!bytes.length) return json_({ ok: false, error: 'bad_media' });
  if (bytes.length > MAX_UPLOAD_BYTES) return json_({ ok: false, error: 'too_big' });
  const ext = (mime.split('/')[1] || 'bin').replace('jpeg', 'jpg').replace('quicktime', 'mov').slice(0, 6);
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HH-mm-ss');
  const name = 'saaf-paani_' + hostel + '-floor' + floor + '_' + stamp + '.' + ext;
  const file = mediaFolder_().createFile(Utilities.newBlob(bytes, mime, name));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return json_({ ok: true, id: file.getId(), type: mime.indexOf('image/') === 0 ? 'image' : 'video' });
}

function mediaFolder_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('MEDIA_FOLDER');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (err) { /* folder deleted: make a new one */ }
  }
  const folder = DriveApp.createFolder('Saaf Paani Media');
  props.setProperty('MEDIA_FOLDER', folder.getId());
  return folder;
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
}

function readRows_() {
  const sh = sheet_();
  if (sh.getLastRow() < 2) return [];
  const tz = Session.getScriptTimeZone();
  return sh.getRange(2, 1, sh.getLastRow() - 1, HEADERS.length).getValues()
    .filter(r => r[0])
    .map(r => ({
      id: String(r[0]),
      loggedAt: r[1] instanceof Date ? r[1].toISOString() : String(r[1]),
      hostel: String(r[2]),
      floor: Number(r[3]),
      type: String(r[4]),
      date: r[5] instanceof Date ? Utilities.formatDate(r[5], tz, 'yyyy-MM-dd') : String(r[5]).replace(/^'/, ''),
      name: String(r[6] || ''),
      witness: String(r[7] || ''),
      media: parseMedia_(r[8])
    }));
}

function parseMedia_(v) {
  if (!v) return [];
  try { const m = JSON.parse(String(v)); return Array.isArray(m) ? m : []; } catch (err) { return []; }
}

function validDate_(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s + 'T00:00:00');
  if (isNaN(d)) return false;
  const now = Date.now();
  return d.getTime() <= now + 2 * 86400000 && d.getTime() >= now - 730 * 86400000;
}

// Trim, cap length, and stop text being read as a spreadsheet formula.
function clean_(s) {
  s = String(s || '').trim().slice(0, 40);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
