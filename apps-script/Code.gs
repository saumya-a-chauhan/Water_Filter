/**
 * Saaf Paani — backend (Google Apps Script + Google Sheet)
 *
 * Every cleaning entry is one row in the "Logs" sheet.
 * GET  ?action=list[&hostel=boys&floor=3]  -> { ok, entries: [...] }   (public)
 * POST { pin, hostel, floor, types[], date, name, witness }            (staff only)
 *
 * Setup steps are in the README.
 */

const SHEET_NAME = 'Logs';
const HEADERS = ['id', 'loggedAt', 'hostel', 'floor', 'type', 'date', 'name', 'witness'];
const HOSTELS = ['boys', 'girls'];
const TYPES = ['filter', 'dispenser', 'jar'];
const FLOORS = 10;

/** Run once from the editor: creates the sheet and a default PIN. */
function setup() {
  const sh = sheet_();
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange('F:F').setNumberFormat('@'); // keep dates as plain text
  }
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

  const pin = PropertiesService.getScriptProperties().getProperty('STAFF_PIN');
  if (!pin || String(body.pin) !== pin) return json_({ ok: false, error: 'bad_pin' });

  const hostel = String(body.hostel || '');
  const floor = Number(body.floor);
  const types = Array.isArray(body.types) ? body.types.filter(t => TYPES.indexOf(t) >= 0) : [];
  const date = String(body.date || '');
  if (HOSTELS.indexOf(hostel) < 0) return json_({ ok: false, error: 'bad_hostel' });
  if (!(floor >= 1 && floor <= FLOORS)) return json_({ ok: false, error: 'bad_floor' });
  if (!types.length) return json_({ ok: false, error: 'bad_type' });
  if (!validDate_(date)) return json_({ ok: false, error: 'bad_date' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = sheet_();
    const now = new Date().toISOString();
    types.forEach(type => {
      sh.appendRow([Utilities.getUuid(), now, hostel, floor, type, "'" + date,
        clean_(body.name), clean_(body.witness)]);
    });
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

/* ---------- helpers ---------- */
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
      witness: String(r[7] || '')
    }));
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
