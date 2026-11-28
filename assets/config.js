/* ------------------------------------------------------------------
   Pantry Watch — settings
   After deploying the Google Apps Script (see README), paste its
   Web app URL into API_URL.
------------------------------------------------------------------- */
window.SAAF_CONFIG = {
  API_URL: "https://script.google.com/macros/s/AKfycby_R4zASPDMW_fEhy4Nt4h1XWHa4x1tI-eT-4NuBhKglmYpVmVgvMcxhTc4ctr2MMYS/exec",

  // Public address of the site. QR codes point here.
  SITE_URL: "https://saumya-a-chauhan.github.io/Water_Filter/",

  HOSTELS: ["boys", "girls"],
  FLOORS: 10,

  // Days after which an item turns amber (first number) and red (second).
  THRESHOLDS: {
    filter: [7, 14],      // steel filter cleaning
    dispenser: [7, 14],   // dispenser cleaning
    jar: [180, 365],      // plastic jar replacement
    fridge: [7, 14]       // fridge clear-out of expired food
  }
};
