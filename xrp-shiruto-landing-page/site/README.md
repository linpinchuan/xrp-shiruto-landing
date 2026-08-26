# XRP SHIRUTO — Landing Page

A single-page order/landing website for XRP SHIRUTO, ready to deploy on Netlify.

## What's inside
```
index.html          → the whole page (HTML + CSS + JS in one file)
images/              → all product images, optimised for web (webp)
apps-script/Code.gs  → backend script that saves orders to a Google Sheet
README.md            → this file
```

## Before you deploy — 3 things to set up

### 1. Connect the order form to a Google Sheet ("Excel")
Static sites like this one have no server, so orders are saved straight into
a Google Sheet using a free Google Apps Script "Web App." You can always
download that sheet as a real Excel file later (`File > Download > Microsoft
Excel (.xlsx)`).

1. Go to [sheets.google.com](https://sheets.google.com) and create a new,
   blank spreadsheet. Name it e.g. "XRP Shiruto Orders".
2. In the sheet, click **Extensions > Apps Script**.
3. Delete any placeholder code, then paste in the contents of
   `apps-script/Code.gs` (included in this folder).
4. Click **Deploy > New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Description: "Order intake"
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, then **Authorize access** and approve the permissions
     (you may see an "unverified app" warning — this is normal for your own
     script; click Advanced > Go to project (unsafe) to proceed).
5. Copy the **Web app URL** you're given (it looks like
   `https://script.google.com/macros/s/AKfycb.../exec`).
6. Open `index.html`, find this line near the bottom:
   ```js
   const SHEET_ENDPOINT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
   ```
   and replace the URL with the one you copied.

Every completed order will now appear as a new row in your Google Sheet in
real time.

### 2. Add your Facebook Pixel ID
1. In Facebook Events Manager, copy your Pixel ID (a string of numbers).
2. In `index.html`, find the two spots with `YOUR_PIXEL_ID_HERE`
   (one inside the `<script>` block, one inside `<noscript>`) and replace
   both with your real Pixel ID.
3. The page already fires:
   - `PageView` — when anyone loads the page
   - `Purchase` — when the order form is submitted successfully (with the
     order value and MYR currency attached), so it's ready to use as your
     conversion event for ad campaigns.
4. After deploying, test it with the **Meta Pixel Helper** Chrome extension
   or the **Test Events** tab in Events Manager.

### 3. Update pricing (optional)
Package prices are placeholders (`RM129 / RM238 / RM329`). To change them,
edit the three `.package` blocks in `index.html` (search for `RM129`) —
update both the visible price text and the `data-price` / input `value`
attributes so they stay in sync.

## Deploying to Netlify
**Drag-and-drop (fastest):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag this whole folder (or a zip of it) onto the page.
3. Netlify gives you a live URL immediately. You can rename the site or
   connect a custom domain from the site settings.

**Via Git (recommended for ongoing edits):**
1. Push this folder to a GitHub/GitLab repo.
2. In Netlify, click **Add new site > Import an existing project** and
   connect the repo. Leave the build command empty and set the publish
   directory to the repo root (where `index.html` lives).

No build step is required — this is a plain static site.

## Notes
- The order form currently collects: full name, phone number, delivery
  address, and postcode, with basic client-side validation
  (required fields, 5-digit postcode, phone number format).
- A hidden honeypot field (`company`) is included to reduce spam-bot
  submissions.
- The thank-you message shown after a successful order is in Malay, as
  requested: *"Terima kasih atas pesanan anda. Barang akan sampai dalam
  tempoh 2 hingga 4 hari."*
- All copy on the pre-designed image panels (ingredients, process, proof,
  certificates, FAQ, etc.) comes from your original images and is shown
  as-is; surrounding headlines/captions were written to connect the
  sections together.
