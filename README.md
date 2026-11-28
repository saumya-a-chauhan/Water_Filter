# Pantry Watch · पैंट्री वॉच · ਪੈਂਟਰੀ ਵਾਚ

Cleaning records for the steel water filter, the water dispenser and the shared fridge in every hostel floor pantry at Plaksha University. A FEW Nexus course project.

**Live site:** https://saumya-a-chauhan.github.io/Water_Filter/

| Page | Who it's for |
|---|---|
| `index.html` | Overview of all floors in both hostels, colour-coded |
| `floor.html?h=boys&f=3` | What a student sees after scanning a floor's QR code: last cleaning dates, full history, and photos/videos. It has no links to the other pages. |
| `staff.html` | Didi's entry page: hostel → floor → what was done → when → photos/videos → Save |
| `qr.html` | Printable QR posters for all 20 pantries, plus one staff QR |

The home, staff and QR pages ask for the staff PIN once per phone ("Lock this phone" in the footer forgets it). Photos and videos are saved to a Google Drive folder called **Saaf Paani Media**, viewable by anyone with the link.

The site works in English, Hindi and Punjabi. The staff page opens in Hindi by default; everyone can switch language from the top bar.

---

## Setup: connect the Google Sheet (about 10 minutes, one time)

This is already set up for the Plaksha deployment. The steps below are for re-creating it.

1. Go to [sheets.google.com](https://sheets.google.com) and create a blank sheet named **Saaf Paani Logs**.
2. In the sheet: **Extensions → Apps Script**.
3. Delete the code there, paste the contents of [`apps-script/Code.gs`](apps-script/Code.gs), and click **Save**.
4. In the function dropdown at the top choose **`setup`** and click **Run**. Approve the permissions it asks for.
   This creates the `Logs` sheet, the `Saaf Paani Media` Drive folder, and sets the staff PIN to **2580**.
   In **Project Settings**, make sure **Enable Chrome V8 runtime** is ticked.
5. To use a different PIN: edit `NEW_PIN` inside `changePin`, choose **`changePin`**, and click **Run**.
6. Click **Deploy → New deployment** → gear icon → **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
7. Open [`assets/config.js`](assets/config.js), paste that URL into `API_URL`, and commit.
   GitHub Pages updates within a minute or two, and the demo banner disappears.

If you change `Code.gs` later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Printing the QR codes

Open `qr.html` on a laptop, pick a hostel or both, and click **Print**. Each A4 page holds 4 cards. Print in colour if possible, laminate or cover with clear tape, and paste one inside each floor's pantry near the dispenser. Give the **Staff** card to the didis or save that link on their phones.

## Settings

All in [`assets/config.js`](assets/config.js):
- `THRESHOLDS`: after how many days an item turns amber and red. Defaults: filter, dispenser and fridge cleaning 7 / 14 days, plastic jar replacement 180 / 365 days. Agree on these with facilities.
- `FLOORS`, `HOSTELS`: number of floors and hostels.

## Fixing a mistake

Wrong entries can be corrected or deleted directly in the Google Sheet. The website reads the sheet every time a page opens.

## Notes

- Anyone with the link can read the records; only someone with the staff PIN can add them.
- Names typed by staff and student witnesses are shown publicly on the floor page.
- Hindi and Punjabi text should be checked by a native speaker before printing.
