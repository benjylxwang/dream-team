// This is kept in the repo so its in source control - live version is on the google sheet

const DATA_SHEET = "Data";

function doGet(e) {
  try {
    var saveName = e.parameter.saveName;

    var row = getSaveNameRow(saveName, DATA_SHEET);
    if (row != undefined) {
      var doc = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = doc.getSheetByName(DATA_SHEET);
      var json = sheet.getRange(row, 3).getValue();

      return ContentService
            .createTextOutput(JSON.stringify({ "result":"success", "comps": json }))
            .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService
          .createTextOutput(JSON.stringify({ "result":"error", "message": "not found" }))
          .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "message": "Sorry, there is an issue with the server.", "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}


/**
 * Post entry point
 */
function doPost(e) {
  try {
    var saveName = e.parameter.saveName;
    var password = e.parameter.password;
    var comps = e.parameter.comps;

    // Reject empty requests
    if (saveName == "" || password == "") {
      return ContentService
            .createTextOutput(JSON.stringify({"result":"error", "message": "Leader name and code cannot be empty!"}))
              .setMimeType(ContentService.MimeType.JSON);
    }

    var row = getSaveNameRow(saveName, DATA_SHEET);
    if (row !== undefined) {

      // Check password
      if (checkPassword(row, password, DATA_SHEET)) {
        // Insert update to row
        updateComp(row, comps, DATA_SHEET);
      } else {
        return ContentService
              .createTextOutput(JSON.stringify({"result":"error", "message": "Incorrect password!"}))
                .setMimeType(ContentService.MimeType.JSON);
      }


    } else {
      // Save new data row
      saveNewComp(saveName, password, comps, DATA_SHEET);
    }

    return ContentService
          .createTextOutput(JSON.stringify({"result":"success"}))
            .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "message": "Sorry, there is an issue with the server.", "debug": e.parameter, "error": error}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}

function getSaveNameRow(saveName="test", sheetName="Data") {
    // Find save name in sheet
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(sheetName);
    var saveNames = sheet.getRange("A2:A" + sheet.getLastRow());

    var row = 2;
    for (var ls in saveNames.getValues()) {
      l = saveNames.getValues()[ls][0];
      if (l == saveName) {
        return row;
      }
      row += 1;
    }
    return undefined;
}

function checkPassword(saveNameRow=2, password='12345', sheetName="Data") {
  try {
    var doc     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet   = doc.getSheetByName(sheetName);

    var savedPswd = sheet.getRange(saveNameRow, 2).getValue();
    var result = savedPswd == password;
    return result;
  }
  catch(error) {
    Logger.log(error);
    Logger.log(e);
    throw error;
  }
}

function updateComp(saveNameRow, comps, sheetName) {
  try {
    var doc     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet   = doc.getSheetByName(sheetName);

    // Set values
    sheet.getRange(saveNameRow, 3).setValue(comps);
  }
  catch(error) {
    Logger.log(error);
    Logger.log(e);
    throw error;
  }
  finally {
    return;
  }
}

/**
 * This method inserts the data received from the html form submission
 * into the sheet. e is the data received from the POST
 */
function saveNewComp(saveName, password, comps, sheetName) {
  try {
    var doc     = SpreadsheetApp.getActiveSpreadsheet();
    var sheet   = doc.getSheetByName(sheetName);
    var nextRow = sheet.getLastRow()+1; // get next row

    // Set values
    sheet.getRange(nextRow, 1).setValue(saveName);
    sheet.getRange(nextRow, 2).setValue(password);
    sheet.getRange(nextRow, 3).setValue(comps);
  }
  catch(error) {
    Logger.log(error);
    Logger.log(e);
    throw error;
  }
  finally {
    return;
  }
}
