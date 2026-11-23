/* Saaf Paani — shared code: languages, data access, dates, icons */
(function () {
  "use strict";
  const CFG = window.SAAF_CONFIG;

  /* ---------------- translations ---------------- */
  const I18N = {
    en: {
      brand: "Saaf Paani",
      tagline1: "Clean water,",
      tagline2: "on the record.",
      heroSub: "Every floor pantry has one steel filter and one water dispenser. See when each was last cleaned, and when the dispenser jar was last replaced.",
      staffEntry: "Staff entry",
      printQR: "Print QR codes",
      overview: "All floors",
      overviewSub: "Tap a floor to see its full record.",
      boys: "Boys Hostel",
      girls: "Girls Hostel",
      floor: "Floor",
      floorN: "Floor {n}",
      filter: "Steel filter",
      dispenser: "Dispenser",
      jar: "Dispenser jar",
      lastCleaned: "Last cleaned",
      lastReplaced: "Last replaced",
      today: "Today",
      yesterday: "Yesterday",
      daysAgo: "{n} days ago",
      noRecord: "No record yet",
      good: "Good",
      warn: "Due soon",
      bad: "Overdue",
      none: "No record",
      allGood: "All good on this floor",
      dueSoon: "Something is due soon",
      needsAttention: "Needs attention",
      history: "Full history",
      all: "All",
      act_filter: "Steel filter cleaned",
      act_dispenser: "Dispenser cleaned",
      act_jar: "Dispenser jar replaced",
      by: "By",
      witness: "Student present",
      noHistory: "Nothing logged yet for this floor.",
      loading: "Loading…",
      loadError: "Couldn't load the records. Check your internet and try again.",
      retry: "Try again",
      reportHint: "Seen worms, dirt or a bad smell? Tell your warden right away.",
      backHome: "All floors",
      step1: "Which hostel?",
      step2: "Which floor?",
      step3: "What did you do?",
      step3hint: "You can choose more than one.",
      step4: "When?",
      other: "Other date",
      step5: "Names (optional)",
      yourName: "Your name",
      studentName: "Student present",
      pin: "Staff PIN",
      pinHint: "Asked only once on this phone.",
      changePin: "Change PIN",
      save: "Save",
      saving: "Saving…",
      saved: "Saved!",
      addAnother: "Add another entry",
      viewFloor: "See this floor",
      missingHostel: "Choose a hostel",
      missingFloor: "Choose a floor",
      missingType: "Choose what you did",
      missingPin: "Enter the staff PIN",
      badPin: "Wrong PIN. Please try again.",
      saveError: "Something went wrong. Please try again.",
      qrTitle: "QR codes for every pantry",
      qrSub: "Print, cut, and paste one in each floor's pantry, next to the dispenser.",
      print: "Print",
      showAll: "Both hostels",
      scanLine: "Scan to see when the filter and dispenser were cleaned",
      staffCardLine: "Scan to log cleaning",
      footer: "A FEW Nexus project · Plaksha University",
      legend_good: "On schedule",
      legend_warn: "Due soon",
      legend_bad: "Overdue",
      legend_none: "No record yet",
      noneYet: "No cleaning recorded yet for this floor"
    },
    hi: {
      brand: "साफ़ पानी",
      tagline1: "साफ़ पानी,",
      tagline2: "पूरे रिकॉर्ड के साथ।",
      heroSub: "हर मंज़िल की पैंट्री में एक स्टील फ़िल्टर और एक पानी का डिस्पेंसर है। देखिए इन्हें आख़िरी बार कब साफ़ किया गया, और डिस्पेंसर की बोतल आख़िरी बार कब बदली गई।",
      staffEntry: "स्टाफ़ एंट्री",
      printQR: "QR कोड प्रिंट करें",
      overview: "सभी मंज़िलें",
      overviewSub: "पूरा रिकॉर्ड देखने के लिए किसी मंज़िल पर टैप करें।",
      boys: "लड़कों का हॉस्टल",
      girls: "लड़कियों का हॉस्टल",
      floor: "मंज़िल",
      floorN: "मंज़िल {n}",
      filter: "स्टील फ़िल्टर",
      dispenser: "डिस्पेंसर",
      jar: "डिस्पेंसर की बोतल",
      lastCleaned: "पिछली सफ़ाई",
      lastReplaced: "पिछली बार बदली",
      today: "आज",
      yesterday: "कल",
      daysAgo: "{n} दिन पहले",
      noRecord: "अभी कोई रिकॉर्ड नहीं",
      good: "ठीक है",
      warn: "जल्द करना है",
      bad: "देर हो गई",
      none: "कोई रिकॉर्ड नहीं",
      allGood: "इस मंज़िल पर सब ठीक है",
      dueSoon: "कुछ काम जल्द करना है",
      needsAttention: "ध्यान देने की ज़रूरत है",
      history: "पूरा रिकॉर्ड",
      all: "सभी",
      act_filter: "स्टील फ़िल्टर साफ़ किया",
      act_dispenser: "डिस्पेंसर साफ़ किया",
      act_jar: "डिस्पेंसर की बोतल बदली",
      by: "किसने किया",
      witness: "मौजूद छात्र/छात्रा",
      noHistory: "इस मंज़िल के लिए अभी कुछ दर्ज नहीं है।",
      loading: "लोड हो रहा है…",
      loadError: "रिकॉर्ड लोड नहीं हो पाया। इंटरनेट देखकर फिर से कोशिश करें।",
      retry: "फिर से कोशिश करें",
      reportHint: "कीड़े, गंदगी या बदबू दिखे? तुरंत वार्डन को बताएँ।",
      backHome: "सभी मंज़िलें",
      step1: "कौन-सा हॉस्टल?",
      step2: "कौन-सी मंज़िल?",
      step3: "आपने क्या किया?",
      step3hint: "एक से ज़्यादा चुन सकते हैं।",
      step4: "कब?",
      other: "दूसरी तारीख़",
      step5: "नाम (ज़रूरी नहीं)",
      yourName: "आपका नाम",
      studentName: "मौजूद छात्र/छात्रा का नाम",
      pin: "स्टाफ़ पिन",
      pinHint: "इस फ़ोन पर सिर्फ़ एक बार पूछा जाएगा।",
      changePin: "पिन बदलें",
      save: "सेव करें",
      saving: "सेव हो रहा है…",
      saved: "सेव हो गया!",
      addAnother: "एक और एंट्री करें",
      viewFloor: "यह मंज़िल देखें",
      missingHostel: "हॉस्टल चुनें",
      missingFloor: "मंज़िल चुनें",
      missingType: "चुनें कि आपने क्या किया",
      missingPin: "स्टाफ़ पिन डालें",
      badPin: "पिन गलत है। फिर से कोशिश करें।",
      saveError: "कुछ गड़बड़ हुई। फिर से कोशिश करें।",
      qrTitle: "हर पैंट्री के लिए QR कोड",
      qrSub: "प्रिंट करें, काटें, और हर मंज़िल की पैंट्री में डिस्पेंसर के पास चिपकाएँ।",
      print: "प्रिंट करें",
      showAll: "दोनों हॉस्टल",
      scanLine: "फ़िल्टर और डिस्पेंसर की सफ़ाई का रिकॉर्ड देखने के लिए स्कैन करें",
      staffCardLine: "सफ़ाई दर्ज करने के लिए स्कैन करें",
      footer: "एक FEW नेक्सस प्रोजेक्ट · प्लक्षा यूनिवर्सिटी",
      legend_good: "समय पर",
      legend_warn: "जल्द करना है",
      legend_bad: "देर हो गई",
      legend_none: "अभी कोई रिकॉर्ड नहीं",
      noneYet: "इस मंज़िल की अभी कोई सफ़ाई दर्ज नहीं हुई"
    },
    pa: {
      brand: "ਸਾਫ਼ ਪਾਣੀ",
      tagline1: "ਸਾਫ਼ ਪਾਣੀ,",
      tagline2: "ਪੂਰੇ ਰਿਕਾਰਡ ਨਾਲ।",
      heroSub: "ਹਰ ਮੰਜ਼ਿਲ ਦੀ ਪੈਂਟਰੀ ਵਿੱਚ ਇੱਕ ਸਟੀਲ ਫ਼ਿਲਟਰ ਅਤੇ ਇੱਕ ਪਾਣੀ ਦਾ ਡਿਸਪੈਂਸਰ ਹੈ। ਦੇਖੋ ਇਹਨਾਂ ਨੂੰ ਆਖ਼ਰੀ ਵਾਰ ਕਦੋਂ ਸਾਫ਼ ਕੀਤਾ ਗਿਆ, ਅਤੇ ਡਿਸਪੈਂਸਰ ਦੀ ਬੋਤਲ ਆਖ਼ਰੀ ਵਾਰ ਕਦੋਂ ਬਦਲੀ ਗਈ।",
      staffEntry: "ਸਟਾਫ਼ ਐਂਟਰੀ",
      printQR: "QR ਕੋਡ ਪ੍ਰਿੰਟ ਕਰੋ",
      overview: "ਸਾਰੀਆਂ ਮੰਜ਼ਿਲਾਂ",
      overviewSub: "ਪੂਰਾ ਰਿਕਾਰਡ ਦੇਖਣ ਲਈ ਕਿਸੇ ਮੰਜ਼ਿਲ 'ਤੇ ਟੈਪ ਕਰੋ।",
      boys: "ਮੁੰਡਿਆਂ ਦਾ ਹੋਸਟਲ",
      girls: "ਕੁੜੀਆਂ ਦਾ ਹੋਸਟਲ",
      floor: "ਮੰਜ਼ਿਲ",
      floorN: "ਮੰਜ਼ਿਲ {n}",
      filter: "ਸਟੀਲ ਫ਼ਿਲਟਰ",
      dispenser: "ਡਿਸਪੈਂਸਰ",
      jar: "ਡਿਸਪੈਂਸਰ ਦੀ ਬੋਤਲ",
      lastCleaned: "ਪਿਛਲੀ ਸਫ਼ਾਈ",
      lastReplaced: "ਪਿਛਲੀ ਵਾਰ ਬਦਲੀ",
      today: "ਅੱਜ",
      yesterday: "ਕੱਲ੍ਹ",
      daysAgo: "{n} ਦਿਨ ਪਹਿਲਾਂ",
      noRecord: "ਅਜੇ ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ",
      good: "ਠੀਕ ਹੈ",
      warn: "ਜਲਦੀ ਕਰਨਾ ਹੈ",
      bad: "ਦੇਰ ਹੋ ਗਈ",
      none: "ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ",
      allGood: "ਇਸ ਮੰਜ਼ਿਲ 'ਤੇ ਸਭ ਠੀਕ ਹੈ",
      dueSoon: "ਕੁਝ ਕੰਮ ਜਲਦੀ ਕਰਨਾ ਹੈ",
      needsAttention: "ਧਿਆਨ ਦੇਣ ਦੀ ਲੋੜ ਹੈ",
      history: "ਪੂਰਾ ਰਿਕਾਰਡ",
      all: "ਸਾਰੇ",
      act_filter: "ਸਟੀਲ ਫ਼ਿਲਟਰ ਸਾਫ਼ ਕੀਤਾ",
      act_dispenser: "ਡਿਸਪੈਂਸਰ ਸਾਫ਼ ਕੀਤਾ",
      act_jar: "ਡਿਸਪੈਂਸਰ ਦੀ ਬੋਤਲ ਬਦਲੀ",
      by: "ਕਿਸ ਨੇ ਕੀਤਾ",
      witness: "ਮੌਜੂਦ ਵਿਦਿਆਰਥੀ",
      noHistory: "ਇਸ ਮੰਜ਼ਿਲ ਲਈ ਅਜੇ ਕੁਝ ਦਰਜ ਨਹੀਂ ਹੈ।",
      loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…",
      loadError: "ਰਿਕਾਰਡ ਲੋਡ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਇੰਟਰਨੈੱਟ ਦੇਖ ਕੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
      retry: "ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
      reportHint: "ਕੀੜੇ, ਗੰਦਗੀ ਜਾਂ ਬਦਬੂ ਦਿਸੇ? ਤੁਰੰਤ ਵਾਰਡਨ ਨੂੰ ਦੱਸੋ।",
      backHome: "ਸਾਰੀਆਂ ਮੰਜ਼ਿਲਾਂ",
      step1: "ਕਿਹੜਾ ਹੋਸਟਲ?",
      step2: "ਕਿਹੜੀ ਮੰਜ਼ਿਲ?",
      step3: "ਤੁਸੀਂ ਕੀ ਕੀਤਾ?",
      step3hint: "ਇੱਕ ਤੋਂ ਵੱਧ ਚੁਣ ਸਕਦੇ ਹੋ।",
      step4: "ਕਦੋਂ?",
      other: "ਹੋਰ ਤਾਰੀਖ਼",
      step5: "ਨਾਮ (ਲਾਜ਼ਮੀ ਨਹੀਂ)",
      yourName: "ਤੁਹਾਡਾ ਨਾਮ",
      studentName: "ਮੌਜੂਦ ਵਿਦਿਆਰਥੀ ਦਾ ਨਾਮ",
      pin: "ਸਟਾਫ਼ ਪਿੰਨ",
      pinHint: "ਇਸ ਫ਼ੋਨ 'ਤੇ ਸਿਰਫ਼ ਇੱਕ ਵਾਰ ਪੁੱਛਿਆ ਜਾਵੇਗਾ।",
      changePin: "ਪਿੰਨ ਬਦਲੋ",
      save: "ਸੇਵ ਕਰੋ",
      saving: "ਸੇਵ ਹੋ ਰਿਹਾ ਹੈ…",
      saved: "ਸੇਵ ਹੋ ਗਿਆ!",
      addAnother: "ਇੱਕ ਹੋਰ ਐਂਟਰੀ ਕਰੋ",
      viewFloor: "ਇਹ ਮੰਜ਼ਿਲ ਦੇਖੋ",
      missingHostel: "ਹੋਸਟਲ ਚੁਣੋ",
      missingFloor: "ਮੰਜ਼ਿਲ ਚੁਣੋ",
      missingType: "ਚੁਣੋ ਕਿ ਤੁਸੀਂ ਕੀ ਕੀਤਾ",
      missingPin: "ਸਟਾਫ਼ ਪਿੰਨ ਪਾਓ",
      badPin: "ਪਿੰਨ ਗਲਤ ਹੈ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
      saveError: "ਕੁਝ ਗੜਬੜ ਹੋਈ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
      qrTitle: "ਹਰ ਪੈਂਟਰੀ ਲਈ QR ਕੋਡ",
      qrSub: "ਪ੍ਰਿੰਟ ਕਰੋ, ਕੱਟੋ, ਅਤੇ ਹਰ ਮੰਜ਼ਿਲ ਦੀ ਪੈਂਟਰੀ ਵਿੱਚ ਡਿਸਪੈਂਸਰ ਕੋਲ ਚਿਪਕਾਓ।",
      print: "ਪ੍ਰਿੰਟ ਕਰੋ",
      showAll: "ਦੋਵੇਂ ਹੋਸਟਲ",
      scanLine: "ਫ਼ਿਲਟਰ ਅਤੇ ਡਿਸਪੈਂਸਰ ਦੀ ਸਫ਼ਾਈ ਦਾ ਰਿਕਾਰਡ ਦੇਖਣ ਲਈ ਸਕੈਨ ਕਰੋ",
      staffCardLine: "ਸਫ਼ਾਈ ਦਰਜ ਕਰਨ ਲਈ ਸਕੈਨ ਕਰੋ",
      footer: "ਇੱਕ FEW ਨੈਕਸਸ ਪ੍ਰੋਜੈਕਟ · ਪਲਕਸ਼ਾ ਯੂਨੀਵਰਸਿਟੀ",
      legend_good: "ਸਮੇਂ ਸਿਰ",
      legend_warn: "ਜਲਦੀ ਕਰਨਾ ਹੈ",
      legend_bad: "ਦੇਰ ਹੋ ਗਈ",
      legend_none: "ਅਜੇ ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ",
      noneYet: "ਇਸ ਮੰਜ਼ਿਲ ਦੀ ਅਜੇ ਕੋਈ ਸਫ਼ਾਈ ਦਰਜ ਨਹੀਂ ਹੋਈ"
    }
  };
  const LANGS = [
    { id: "en", label: "EN" },
    { id: "hi", label: "हिंदी" },
    { id: "pa", label: "ਪੰਜਾਬੀ" }
  ];
  const LOCALES = { en: "en-IN", hi: "hi-IN", pa: "pa-IN" };
  const TYPES = ["filter", "dispenser", "jar"];

  /* ---------------- safe local storage ---------------- */
  const store = {
    get(k, d) {
      try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  let lang = store.get("sp_lang", document.documentElement.dataset.defaultLang || "en");
  if (!I18N[lang]) lang = "en";

  function t(key, vars) {
    let s = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
    if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  }
  function tIn(l, key, vars) {
    const keep = lang; lang = l; const s = t(key, vars); lang = keep; return s;
  }

  function applyI18n() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    renderLangSwitch();
  }
  function setLang(l) {
    lang = l; store.set("sp_lang", l); applyI18n();
    document.dispatchEvent(new CustomEvent("langchange"));
  }
  function renderLangSwitch() {
    const el = document.getElementById("lang");
    if (!el) return;
    el.innerHTML = LANGS.map(l =>
      `<button type="button" lang="${l.id}" data-l="${l.id}" class="${l.id === lang ? "on" : ""}" aria-pressed="${l.id === lang}">${l.label}</button>`
    ).join("");
    el.querySelectorAll("button").forEach(b => { b.onclick = () => setLang(b.dataset.l); });
  }

  /* ---------------- dates ---------------- */
  function iso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function todayISO() { return iso(new Date()); }
  function addDays(s, n) { const d = parseISO(s); d.setDate(d.getDate() + n); return iso(d); }
  function parseISO(s) { const [y, m, d] = String(s).split("-").map(Number); return new Date(y, m - 1, d); }
  function daysSince(s) { return Math.round((parseISO(todayISO()) - parseISO(s)) / 86400000); }
  function fmtDate(s, opts) {
    return parseISO(s).toLocaleDateString(LOCALES[lang], opts || { day: "numeric", month: "short", year: "numeric" });
  }
  function relDays(n) {
    if (n <= 0) return t("today");
    if (n === 1) return t("yesterday");
    return t("daysAgo", { n });
  }
  function statusOf(type, days) {
    if (days == null) return "none";
    const [g, w] = CFG.THRESHOLDS[type];
    return days <= g ? "good" : days <= w ? "warn" : "bad";
  }

  /* ---------------- helpers ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function pad2(n) { return String(n).padStart(2, "0"); }
  function siteBase() {
    if (CFG.SITE_URL) return CFG.SITE_URL.replace(/\/?$/, "/");
    return location.href.replace(/[?#].*$/, "").replace(/[^/]*$/, "");
  }
  function floorUrl(h, f) { return siteBase() + "floor.html?h=" + h + "&f=" + f; }
  function sortEntries(list) {
    return list.slice().sort((a, b) => (b.date + (b.loggedAt || "")).localeCompare(a.date + (a.loggedAt || "")));
  }
  function latestByType(entries) {
    const out = {};
    sortEntries(entries).forEach(e => { if (!out[e.type]) out[e.type] = e; });
    return out;
  }
  function floorStatus(entries) {
    const latest = latestByType(entries);
    const st = {};
    TYPES.forEach(ty => { st[ty] = statusOf(ty, latest[ty] ? daysSince(latest[ty].date) : null); });
    return { latest, st };
  }

  /* ---------------- data: Google Apps Script ---------------- */
  const API = {
    async list(q) {
      q = q || {};
      if (!CFG.API_URL) throw new Error("not_connected");
      const u = new URL(CFG.API_URL);
      u.searchParams.set("action", "list");
      if (q.hostel) u.searchParams.set("hostel", q.hostel);
      if (q.floor) u.searchParams.set("floor", q.floor);
      const r = await fetch(u.toString());
      const j = await r.json();
      if (!j.ok) throw new Error(j.error || "load_failed");
      return j.entries
        .map(e => Object.assign({}, e, { floor: Number(e.floor) }))
        .filter(e => (!q.hostel || e.hostel === q.hostel) && (!q.floor || e.floor === Number(q.floor)));
    },
    async add(payload) {
      if (!CFG.API_URL) return { ok: false, error: "not_connected" };
      // text/plain avoids a CORS preflight, which Apps Script can't answer
      const r = await fetch(CFG.API_URL, { method: "POST", body: JSON.stringify(payload) });
      return r.json();
    }
  };

  /* ---------------- icons ---------------- */
  const ICONS = {
    filter: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 5h12v5H18z"/><rect x="11" y="10" width="26" height="31" rx="4"/><path d="M11 18h26"/><path d="M37 30h5v5"/><path d="M42 39v1.5"/><path d="M17 41v3M31 41v3"/></svg>',
    dispenser: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 3h8v4c4.5 1.2 7 4 7 8v4H13v-4c0-4 2.5-6.8 7-8z"/><rect x="12" y="19" width="24" height="26" rx="3"/><path d="M19 27h10v6H19z"/><path d="M18 39h12"/></svg>',
    jar: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 4h8v5c5 1.6 8 5.2 8 10v19a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V19c0-4.8 3-8.4 8-10z"/><path d="M19 26a6 6 0 0 1 10-2"/><path d="M29 20v4h-4"/><path d="M29 32a6 6 0 0 1-10 2"/><path d="M19 38v-4h4"/></svg>',
    drop: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3C24 3 9 20 9 30a15 15 0 0 0 30 0C39 20 24 3 24 3z" fill="currentColor"/><path d="M17 31a7 7 0 0 0 7 7" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".75"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    boys: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 42V18L24 6l18 12v24"/><path d="M6 42h36"/><path d="M19 42V30h10v12"/><path d="M14 22h4M30 22h4"/></svg>',
    girls: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 42V18L24 6l18 12v24"/><path d="M6 42h36"/><path d="M19 42V30h10v12"/><path d="M14 22h4M30 22h4"/><circle cx="24" cy="18" r="2.5"/></svg>'
  };

  /* ---------------- shared page bits ---------------- */
  function mountChrome() {
    const brand = document.getElementById("brand");
    if (brand) {
      brand.innerHTML = `<a href="index.html" class="brand-link"><span class="logo">${ICONS.drop}</span><span class="brand-name" data-i18n="brand"></span></a>`;
    }
    applyI18n();
  }

  window.SP = {
    CFG, TYPES, ICONS, API, store,
    t, tIn, setLang, applyI18n, get lang() { return lang; },
    todayISO, addDays, daysSince, fmtDate, relDays, statusOf, parseISO,
    esc, pad2, floorUrl, siteBase, sortEntries, latestByType, floorStatus, mountChrome
  };
})();
