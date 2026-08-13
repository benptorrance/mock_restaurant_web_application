# I. Introduction
Objective: Develop a responsive web application that simulates a mock restaurant with the ability to order food and login
Tools and Technologies: HTML, CSS (Grid, Flexbox, Media Queries, Modal), JavaScript (Modal), Auth 0
## Goals:
-Implement responsive design.
-Develop a menu that the user can order from.
-Create a persistent cart that holds the foods the user has ordered.
-Using a Modal, the user can go through the cart and finalize their order.
-Ensure a visually appealing and user-friendly application.

# II. Responsive Design
## Implementation
-Media Queries: Implement media queries to adapt the layout for mobile and desktop screen sizes.
-CSS Grid and Flexbox: Use CSS Grid and Flexbox to create flexible and responsive layouts.
-Responsive Components: Ensure all components adjust appropriately across different devices.

# III. Feature Implementation
## Selected Features
-Feature 1: Use arrays, objects, sets, or maps to store and retrieve information displayed in the app.
-Feature 2: Validate user input and either prevent the invalid input or inform the user about it (in all cases prevent invalid input from being stored or saved).
-Feature 3: Persist important data to the user to local storage and make the stored data accessible in your app. (including after reload/refresh). (Cart
-Backup Feature: Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs.  Basic math functions don’t count (e.g. addition, etc).
## Integration of Third-Party API
-Auth 0: Integrate the Auth 0 API to allow user login
-Swipe API: Integrate Swipe to handle credit card transactions

# IV. Data Handling and Analysis
##Data Storage and Retrieval
-Store menu information in arrays or objects.
-Implement functionality to update and retrieve this data as needed.

# V. Advanced Features
Integrate the Auth 0 API to allow users to create and login with an account that holds previous order data.
-Create a small bar graph that shows current progress and how close the user is to earning a discount or free menu item. 

# VI. Project Development
## Node.js Web Server (Optional)
-Set up a Node.js server using Express.js to serve the application.
-Implement at least one route that the app uses (e.g., /weather, /emissions).

# VII. Installation Instructions

Note: In order to be able to run this program, the following must be installed:

Node v 24.14.0 or later
npm v 11.9.0 or later
http-server@14.1.1 or later

- Download and install Visual Studio Code from Microsoft's website.
- Go to Nodejs.org and install Node v24.14.0 or later.
- Clone the repository to a folder somewhere on your computer using git Bash if you have that installed or download the repository as a .zip file and extract it to a folder somewhere on your computer.
- Open up Visual Studio Code with the folder that you cloned the repository to as the root.
- Verify that your Version of Node and npm is correct with the commands "node -v" and "npm -v". (If you get an error message about
  - Note: If you get an error message when trying to run either of the above two commands that says something about scripts being disabled, then open up Windows       Powershell on your computer and enter this command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser". It should fix that issue. 
- Copy and paste this command into the Terminal "npx http-server -p 5500 -a localhost -c-1 ./"
- Enter "y" if it asks you to install http-server@14.1.1.
- Open up a browser of your choice and go to localhost:5500

# VIII. User Test Credentials
Username: TestUser
Password: Password54321
