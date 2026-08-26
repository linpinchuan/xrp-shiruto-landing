/**
 * XRP SHIRUTO — Order Form → Google Sheet backend
 * ------------------------------------------------
 * This script receives order submissions from the landing page (index.html)
 * and appends each order as a new row in this Google Sheet.
 * The sheet can be opened directly, or downloaded as .xlsx any time via
 * File > Download > Microsoft Excel (.xlsx) in Google Sheets.
 *
 * SETUP — see README.md for the full step-by-step guide.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add header row once, if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Nama Penuh', 'No. Telefon', 'Alamat',
      'Poskod', 'Pakej', 'Harga (RM)', 'Sumber'
    ]);
  }

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: 'Invalid JSON' })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.fullName || '',
    data.phone || '',
    data.address || '',
    data.postcode || '',
    data.package || '',
    data.price || '',
    data.source || ''
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'XRP SHIRUTO order endpoint is live' })
  ).setMimeType(ContentService.MimeType.JSON);
}
