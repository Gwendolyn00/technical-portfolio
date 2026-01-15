/*
  AV Support Calendar Integration
  Imports Google Calendar events into spreadsheet with filtering
 */

function importGoogleCalendar() { 
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 42;
  var numRows = sheet.getLastRow() - startRow + 1;
  var numCols = 6;

  if (numRows < 1) {
    numRows = 1;
  }
  
  // Clear existing data
  var range = sheet.getRange(startRow, 1, numRows, numCols);
  range.setBorder(true, true, true, true, true, true, "white", SpreadsheetApp.BorderStyle.SOLID);
  range.clearContent();

  // Get calendar
  var calendarId = sheet.getRange('C1').getValue().toString(); 
  var calendar = CalendarApp.getCalendarById(calendarId);
 
  // Read filter settings from cells
  var selectedYear = sheet.getRange('C2').getValue();
  var selectedMonth = sheet.getRange('C3').getValue();
  var startDateCell = sheet.getRange('C4').getValue();
  var endDateCell = sheet.getRange('C5').getValue();

  var startDate, endDate;

  // Determine date range based on filters
  if (startDateCell && endDateCell) {
    // Use custom date range
    startDate = new Date(startDateCell);
    endDate = new Date(endDateCell);
    endDate.setHours(23, 59, 59);
  } else if (selectedYear) {
    // Use year filter
    startDate = new Date(selectedYear, 0, 1);
    endDate = new Date(selectedYear, 11, 31, 23, 59, 59);

    // Add month filter if specified
    if (selectedMonth) {
      var year = selectedYear; 
      startDate = new Date(year, new Date(selectedMonth + " 1, " + year).getMonth(), 1);
      endDate = new Date(year, startDate.getMonth() + 1, 0, 23, 59, 59); 
    }
  } else {
    Logger.log("No valid date information provided.");
    return;
  }

  Logger.log("Date Range - Start: " + startDate + ", End: " + endDate);
 
  // Create header row
  var header = [["Date", "Title", "Description", "Location", "Guests"]];
  var headerRange = sheet.getRange("B41:F41");
  headerRange.setValues(header);
  headerRange.setFontWeight("bold");
 
  // Get events from calendar
  var events = calendar.getEvents(startDate, endDate);
  Logger.log("Total Events Retrieved: " + events.length);
 
  // Process and display events
  var displayedCount = 0;
  for (var i = 0; i < events.length; i++) {
    var event = events[i];

    // Filter out non-support events based on title keywords
    var title = event.getTitle().toLowerCase();
    if (title.startsWith("[events]") || 
        title.includes("vacation") || 
        title.includes("apt") || 
        title.includes("appointment") || 
        title.includes("out of") || 
        title.includes("lunch") || 
        title.includes("day")) {
      Logger.log("Skipping Event: " + title);
      continue; // Skip this event
    }

    // Extract event details
    var eventDate = event.getStartTime();
    var guests = event.getGuestList()
      .map(function(guest) { return guest.getEmail(); })
      .join(", ");
    
    var details = [[
      event.getStartTime(),  
      event.getTitle(), 
      event.getDescription(), 
      event.getLocation(), 
      guests
    ]];
    
    // Write to spreadsheet
    var row = displayedCount + 42;
    var dataRange = sheet.getRange(row, 2, 1, 5);
    dataRange.setValues(details);

    // Apply formatting
    dataRange.setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID);
    
    var startCell = sheet.getRange(row, 2);
    startCell.setHorizontalAlignment("center");
    startCell.setNumberFormat('MM/dd/yyyy');
    
    displayedCount++;
  }
  
  Logger.log("Events Displayed: " + displayedCount);
}

/*
  Clear all calendar event data and filters
 */
function clearCalendarEvents() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 42;
  var numRows = sheet.getLastRow() - startRow + 1;
  var numCols = 6;

  if (numRows < 1) {
    numRows = 1;
  }
  
  var range = sheet.getRange(startRow, 1, numRows, numCols);
  range.setBorder(true, true, true, true, true, true, "white", SpreadsheetApp.BorderStyle.SOLID);
  range.clearContent();

  var filterRange = sheet.getRange('C2:C5');
  filterRange.clearContent();
  
  Logger.log("Calendar events and filters cleared");
}
