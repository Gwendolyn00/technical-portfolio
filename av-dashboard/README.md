# AV Support Dashboard

## Overview
Automated dashboard that integrates Google Calendar API to track and visualize AV support requests across 31 classrooms.

## Problem Statement
- Manual tracking of support requests was time-consuming
- No visibility into support patterns or high-need locations
- Difficult to allocate resources effectively

## Solution
Built a Google Apps Script application that:
- Integrates with Google Calendar API to automatically pull event data
- Processes and categorizes support types
- Visualizes trends in a dashboard
- Identifies rooms frequently needing support

## Tech Stack
- **Google Apps Script** (JavaScript)
- **Google Calendar API** (OAuth 2.0)
- **Google Sheets** (data storage and visualization)

## Key Features
-  Automated data collection via Calendar API
-  Real-time dashboard showing support trends
-  Room-by-room breakdown of support needs
-  Weekly/monthly reporting

## Impact
-  Improved resource allocation
-  Reduced manual data entry time
-  Identified patterns for proactive maintenance

## Code Sample
See `dashboard-script.js` for the main Apps Script code.

## What I Learned
- OAuth 2.0 authentication for Google APIs
- Handling API rate limits and error handling
- Data transformation and visualization
- Building user-friendly dashboards
