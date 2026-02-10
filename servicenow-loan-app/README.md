# Project: ServiceNow Loan App

## Overview
**Problem:** The manualprocess for requesting a vehicle process on emails and spreadsheets was ineffcient, prone to errors and no real time visibility into the inventory and request status.

**Solution:** Developed a custom scoped ServiceNow application to automate the lifecycle of vehicle requests, approvals, and inventory tracking.

## Process Analysis & Design
I mapped two core business process to define the system's logic:

**Loaner Vehicle Request Flow**

```mermaid
flowchart TD
    Start([User submits Loaner Request Form]) --> Task1[Tracker Record is created]
    Task1 --> Decision{Approved?}
    Decision -- Yes --> Event1a[Delivery Task Created]
    Event1a --> Event2a[Item Record Updated to Closed]
    Event2a --> Event3a[Vehicle Tracker Record Updated to Out on Field]
    Event3a --> End([Process End])
    Decision -- No --> Event1b[Item Record Updated to Closed Imcomplete]
    Event1b --> Event2b[Vehicle Tracker Record UPdated to Returned to Warehouse]
    Event2b --> End([Process End])
```

** Rescheduled Return Loaner Vehicle Flow**

```mermaid
flowchart TD
    Start([User submits a Rescheduled Return Form]) --> Task1[Requested Item is created]
    Task1 --> Decision{Approved?}
    Decision -- Yes --> Event1[Update Tracker record witht he new return dates]
    Event1 --> Event2[Send Automated Confirmation Email]
    Event2 --> End1([Process End])
```
