# Greystone Frontend Code Challenge
## Features
1. **User Login:** Existing user login, Option to create new user account
2. **Create Loan:** Enter details to create a new loan
3. **Loan Management:** Fetch and display all of a user's loans in a sortable data table
4. **Loan Amortization Schedule:** Fetch and display the amortization schedule for a user's specific loan ID
5. **Loan Sharing:** Share a loan with another existing user in the system

## Tech Stack

- **Frontend:** React, JavaScript
- **UI & Styling:** Material-UI, Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Node.js

## Installation
Initial package installation:
```bash
cd loan-app
npm install
```
To run locally:
```bash
npm run start
```
## Potential Improvements

#### 1. Enhanced Authentication
- Currently, this app is operating as a single-page application, with the current session's username being stored in a state variable for simplicity. For more secure login, I would implement a seperate login page and store the login information in a session-based authentication variable. Then after successful login, I would route to the main page to display the user information.

#### 2. Improved Amortization Display
- When viewing the Amorization Schedule for a given Loan ID, the numerical representation of months are used. If given information about when loans are started, I could convert the numbers into a more user-friendly format (ex. December 2024).

#### 3. Form Submission Confirmation 
- For the 'Share a Loan' form, I have an additional pop-up that asks the user if they are sure they want to share loan X with user Y. If this additional round of confirmation prior to submission would be helpful for the 'Create New Loan' form, I would add that as well.
