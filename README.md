## First ERD
<img width="967" alt="Snipaste_2024-11-20_02-17-39" src="https://github.com/user-attachments/assets/92dd9cbf-2a8b-4547-885e-e4883698ed0d">

### User

Description: The core table that manages all platform users, including donors, charities, and administrators.
Attributes:
- user_id: Primary Key (Auto Increment), uniquely identifies each user.
- email, password: Authentication credentials.
- user_type: User type (Donor, Charity, Admin).
- first_name, last_name: User’s full name.
- address, avatar: Optional profile information.
- Referenced by the Donor, Charity, and Admin tables as a Foreign Key (FK).

### Donor

Description: Stores additional information about donors.
Attributes:
user_id: FK referencing the User table and serves as the Primary Key.
total_donations: Total amount donated by the donor.
donation_count: Number of donations made by the donor.

### Charity

Description: Stores additional information about charities.
Attributes:
user_id: FK referencing the User table and serves as the Primary Key.
organization_name: Name of the organization.

### Admin

Description: Stores additional information about administrators.
Attributes:
user_id: FK referencing the User table and serves as the Primary Key.
role_description: A description of the administrator's role.

### Charity_Project

Description: Stores information about charity projects.
Attributes:
project_id: Primary Key (Auto Increment), uniquely identifies each project.
charity_id: FK referencing the Charity table.
title, description: Details about the project.
category: Type of the project (e.g., Food, Health, Education).
target_amount, current_funding: Financial details.
status: Project status (Active, Halted, Completed).

### Donation

Description: Tracks individual donations made to charity projects.
Attributes:
donation_id: Primary Key (Auto Increment), uniquely identifies each donation.
project_id: FK referencing the Charity_Project table.
donor_id: FK referencing the Donor table.
amount, donation_message: Donation details.
donation_date: Date of the donation.

### Transaction

Description: Stores details about payment transactions for donations.
Attributes:
transaction_id: Primary Key (Auto Increment), uniquely identifies each transaction.
donation_id: FK referencing the Donation table.
payment_method, transaction_status: Payment details.
transaction_date: Date of the transaction.

### Subscription

Description: Tracks donor subscriptions to notifications for specific project categories or regions.
Attributes:
subscription_id: Primary Key (Auto Increment), uniquely identifies each subscription.
donor_id: FK referencing the Donor table.
category, region: Subscription preferences.
created_at: Subscription creation timestamp.

### Admin_Action

Description: Logs actions performed by administrators on the platform.
Attributes:
action_id: Primary Key (Auto Increment), uniquely identifies each action.
admin_id: FK referencing the Admin table.
target_id: FK referencing the Charity_Project table.
action_type, reason: Details about the action.
action_date: Timestamp of the action.
