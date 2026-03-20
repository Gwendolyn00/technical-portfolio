## Create a Scope Application: Loaner Vehicle Request and Inveentory

Created 3 new tables:

### **Loaner Vehicle Catalog** with fields such as:

| Name | Type| 
| :--- | :--- |
| Number | Auto-number |
| Status | Choice |
| Vehicle Make |String |
| Vehicle Model | String |
| Vehicle Year | String | 
| Vehicle Description | String |
| Image | Image |

And then imported a file with the current inventory data.

Related List:
- Vehicle Tracker
- Vehicle Servicing



### **Vehicle Tracker** with fields such as:

| Name | Type| 
| :--- | :--- |
| Number | Auto-number |
| Request Number | Reference: sc_req_item |
| Vehicle | Reference: Loaner Vehicle Catalog  |
| Vehicle Status | Choice |
| Tracker Status | Choice | 
| Assigned To | Reference: sys_user |
| Location | Reference: cmn_location |

This table is for every time a vehicle is requested, it is used to track the whereabouts of the vehiles.

Related List:
- Vehicle Servicing


### **Vehicle Servicing** with fields such as:

| Name | Type| 
| :--- | :--- |
| Number | Auto-number |
| Vehicle Tracker | Reference: Vehicle Tracker |
| Vehicle | Reference: Loaner Vehicle Catalog  |
| Sent for Servicing | Date | 
| Ticket Status | Choice |
| Vehicle Issues | String |
| Work Performed | String |

This table is to track vehicles that are being serviced and store those records.
