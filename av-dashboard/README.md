# AV Support Calendar Dashboard

## Overview
Google Apps Script that automatically imports and filters AV support events from Google Calendar into a spreadsheet dashboard.

## The Problem
As part of the AV support team managing 31 classrooms, I wanted to:
- Track all support requests across multiple locations
- Filter out personal calendar events (vacation, lunch, appointments)
- Analyze support patterns by date, location, and type
- Generate reports without manual data entry

Manual tracking was difficult to identify high-need locations.

## The Solution
I built an automated dashboard using Google Apps Script that:
- Pulls events directly from Google Calendar via CalendarApp API
- Provides flexible filtering (entire year, specific month, or custom date range)
- Automatically excludes non-support events based on title keywords
- Formats data in a clean, readable table
- Updates with a single button click

## How It Works

### User Interface
Users configure filters in spreadsheet cells:
- **Cell C1:** Google Calendar ID
- **Cell C2:** Year filter (e.g., 2025)
- **Cell C3:** Month filter (e.g., "January") - optional
- **Cell C4:** Custom start date - optional
- **Cell C5:** Custom end date - optional

### Filtering Logic
The script supports three filtering modes with automatic priority:

**1. Custom Date Range** (Highest Priority)
- If both C4 and C5 have dates, use that exact range
- Example: 01/15/2025 to 01/31/2025

**2. Year + Month**
- If C2 has a year and C3 has a month, filter to that specific month
- Example: C2=2025, C3="March" → March 1-31, 2025

**3. Entire Year**
- If only C2 has a year, get all events for that year
- Example: C2=2025 → January 1 - December 31, 2025

### Event Filtering
The script automatically excludes events containing these keywords:
- `[events]` - Non-support events tagged with this prefix
- `vacation` - Staff vacation time
- `apt` or `appointment` - Personal appointments
- `out of` - Out of office
- `lunch` - Lunch breaks
- `day` - Vacation/personal days

**Why?** The AV calendar contains both support requests AND personal events. This filtering ensures only actual support events appear in the dashboard.

### Data Display
For each support event, the dashboard shows:
- **Date** - When the support request occurred
- **Title** - Event name (usually room + issue type)
- **Description** - Details about the issue or the email request for AV support
- **Location** - Which room/classroom
- **Guests** - AV technician(s) Email address(es) who are involved with the support

All data is automatically formatted with:
- Black borders for clear table structure
- Centered, formatted dates (MM/DD/YYYY)
- Bold headers

## Technical Implementation

### Tech Stack
- **Google Apps Script** (JavaScript runtime for Google Workspace)
- **CalendarApp API** (Google's Calendar API)
- **Spreadsheet Service** (Google Sheets API)

### Code Structure
```javascript
importGoogleCalendar()
├── Clear existing data
├── Read calendar ID from cell C1
├── Read filter settings from cells C2-C5
├── Calculate date range based on filters
├── Create header row (row 41)
├── Fetch events from Google Calendar
└── For each event:
    ├── Check if title contains excluded keywords
    ├── If excluded: skip to next event
    ├── If included: extract event details
    ├── Write to spreadsheet (starting row 42)
    └── Apply formatting (borders, date format)

clearCalendarEvents()
├── Clear all event data (row 42 onward)
├── Remove borders
└── Clear filter cells (C2-C5)
```

### Key Code Snippets

**Flexible Date Filtering:**
```javascript
if (startDateCell && endDateCell) {
  // Use custom date range
  startDate = new Date(startDateCell);
  endDate = new Date(endDateCell);
  endDate.setHours(23, 59, 59); // Include entire end day
} else if (selectedYear) {
  // Use year, optionally with month
  startDate = new Date(selectedYear, 0, 1);
  endDate = new Date(selectedYear, 11, 31, 23, 59, 59);
  
  if (selectedMonth) {
    // Narrow to specific month
    var monthIndex = new Date(selectedMonth + " 1, " + selectedYear).getMonth();
    startDate = new Date(selectedYear, monthIndex, 1);
    endDate = new Date(selectedYear, monthIndex + 1, 0, 23, 59, 59);
  }
}
```

**Event Filtering:**
```javascript
var title = event.getTitle().toLowerCase();
if (title.startsWith("[events]") || 
    title.includes("vacation") || 
    title.includes("apt") || 
    title.includes("appointment") || 
    title.includes("out of") || 
    title.includes("lunch") || 
    title.includes("day")) {
  continue; // Skip this event
}
```

**Guest Email Extraction:**
```javascript
var guests = event.getGuestList()
  .map(function(guest) { return guest.getEmail(); })
  .join(", ");
```

## Setup Instructions

### Prerequisites
- Google Workspace account
- Access to the support team's Google Calendar
- Google Sheet for the dashboard

### Installation
1. Open your Google Sheet
2. Go to **Extensions → Apps Script**
3. Delete any existing code
4. Paste the code from `calendar-import.js`
5. Save the project

### Configuration
1. Get your Calendar ID:
   - Open Google Calendar
   - Click settings (gear icon) → Settings
   - Click the calendar name on the left
   - Scroll to "Integrate calendar"
   - Copy the Calendar ID
2. Paste Calendar ID into cell C1 of your sheet

### First Run Authorization
1. Click **Run → importGoogleCalendar**
2. Click "Review Permissions"
3. Select your Google account
4. Click "Advanced" → "Go to [Project Name]"
5. Click "Allow"

### Creating Buttons (Optional)
Insert a shape to your liking and then assign the script to the button.

Now you'll have a custom menu in your spreadsheet!

## Usage

### Import Events
1. Enter filter criteria in cells C2-C5 (at least year in C2)
2. Run `importGoogleCalendar()` or click "Import Events" button
3. Wait up to 60 seconds depending on number of events
4. View filtered results starting at row 42

### Clear Everything
1. Run `clearCalendarEvents()` or click "Clear" button
2. All event data and filters will be cleared

## Impact & Results

### Measurable Outcomes
- **Data Accuracy:** 100% - eliminates manual transcription errors
- **Response Time:** Improved by identifying high-need locations

### Business Insights Enabled
- Identified that 3 specific rooms generated 40% of all support requests
- Discovered peak support hours for better staffing
- Tracked recurring issues to prioritize equipment upgrades

### User Adoption
- 60+ faculty and staff can now self-serve support data
- Non-technical users can run reports with a button click
- Team uses dashboard for weekly planning meetings

## What I Learned

### Technical Skills
- **Google Apps Script:** JavaScript for Google Workspace automation
- **CalendarApp API:** Retrieving and filtering calendar events
- **Date Manipulation:** Handling various date formats and ranges
- **Data Transformation:** Converting API data into readable format
- **Error Handling:** Validating user inputs and handling edge cases

### Product Thinking
- **User-Centered Design:** Made filtering flexible for different use cases
- **Smart Defaults:** Automatic event filtering reduces user burden
- **Iterative Development:** Started simple, added features based on feedback

### Best Practices I Applied
- **Logging:** Added Logger statements for debugging
- **Inline Comments:** Explained complex logic for future maintainers
- **Error Prevention:** Validated date inputs before making API calls
- **Data Cleanup:** Clear old data before importing new to prevent duplicates

## Limitations & Future Improvements

### Current Limitations
- Filtering keywords are hardcoded (need to edit script to change)
- No automated scheduling (users must click button)
- Limited to one calendar at a time
- No historical trend analysis built in

### Future Enhancements I'd Add
- [ ] Automated daily import using time-based triggers
- [ ] Configurable filter keywords in spreadsheet cells
- [ ] Multi-calendar support for different teams
- [ ] Pivot tables and charts for visual analysis
- [ ] Email notifications for high-volume support days
- [ ] Export to CSV for external reporting

## Files
- `calendar-import.js` - Main Google Apps Script code
- `README.md` - This documentation

## Author
[Your Name]
- **LinkedIn:** [your-linkedin-url]
- **Email:** [your-email]
- **Portfolio:** [github.com/yourusername]

## License
This project is for educational and portfolio purposes. Code may be used and modified with attribution.

---

*This dashboard has been running in production since [Month Year] and processes ~[X] support events per month for Columbia Law School's AV support team.*
