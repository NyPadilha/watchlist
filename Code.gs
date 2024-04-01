function formatData() {
  var targetSheetName = "WatchList"; // Replace "WatchList" with the name of your target sheet
  
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var targetSheet = spreadsheet.getSheetByName(targetSheetName);
  
  if (!targetSheet) {
    Logger.log("Sheet '" + targetSheetName + "' not found.");
    return;
  }

  var sourceRange = targetSheet.getRange("Q4:Q").getValues().flat(); // Assuming the data starts from Q4 and flattening the array
  
  // Clear existing content in the destination range
  var destinationRange = targetSheet.getRange("Q4");
  var lastRow = targetSheet.getLastRow();
  if (lastRow > 4) {
    targetSheet.getRange("Q4:Q" + lastRow).clearContent();
  }

  var numRows = 0;
  var rowIndex = 4; // Start row index for formatted data
  
  // Loop through the source data and format it
  for (var i = 0; i < sourceRange.length; i += 5) {
    var dateText = sourceRange[i];
    
    // Check if the dateText is empty (indicating the end of data)
    if (!dateText) {
      rowIndex++; // Move to the next row
      continue; // Skip processing empty rows
    }
    
    var imageLink = sourceRange[i + 1];
    var title = sourceRange[i + 2];
    var link = sourceRange[i + 3];
    
    // Format first line: merged, 2 columns 
    var firstLineRange = targetSheet.getRange(rowIndex, 17, 1, 2);
    firstLineRange.merge().setValue(dateText).setFontFamily("Calibri").setFontSize(10).setFontWeight("bold").setHorizontalAlignment("center");
    firstLineRange.setBorder(true, true, false, true, false, false, "#000000", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

    rowIndex++; // Move to next row
    
    // Format second line: merged, 2 columns, 11 rows
    var secondLineRange = targetSheet.getRange(rowIndex, 17, 12, 2);
    secondLineRange.merge().setFormula('=IMAGE("' + imageLink + '")').setHorizontalAlignment("center");
    secondLineRange.setBorder(false, true, false, true, false, false, "#000000", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);

    rowIndex += 12; // Move to next row after image
    
    // Format third line: merged, 2 columns
    var thirdLineRange = targetSheet.getRange(rowIndex, 17, 1, 2).setFormula('=HYPERLINK("' + link + '"; "' + title + '")').merge();
    thirdLineRange.setFontFamily("Calibri").setFontSize(10).setFontWeight("bold").setHorizontalAlignment("center").setFontColor("#000000").setFontLine("none");
    thirdLineRange.setBorder(false, true, true, true, false, false, "#000000", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    
    rowIndex++; // Move to next row
    
    // Format fourth line: merged, 2 columns
    targetSheet.getRange(rowIndex, 17, 1, 2).merge().setValue("");
    
    rowIndex++; // Move to next row
    
    numRows++; // Increment the number of rows processed
  }
  
  Logger.log("Total number of rows processed: " + numRows);
}
