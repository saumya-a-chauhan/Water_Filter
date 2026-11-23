/* ------------------------------------------------------------------
   Saaf Paani — settings
   After deploying the Google Apps Script (see README), paste its
   Web app URL into API_URL. While API_URL is empty the site runs in
   DEMO MODE with sample data saved only in the browser.
------------------------------------------------------------------- */
window.SAAF_CONFIG = {
  API_URL: "",

  // Public address of the site. QR codes point here.
  SITE_URL: "https://saumya-a-chauhan.github.io/Water_Filter/",

  HOSTELS: ["boys", "girls"],
  FLOORS: 10,

  // Days after which an item turns amber (first number) and red (second).
  THRESHOLDS: {
    filter: [7, 14],      // steel filter cleaning
    dispenser: [7, 14],   // dispenser cleaning
    jar: [180, 365]       // plastic jar replacement
  }
};
