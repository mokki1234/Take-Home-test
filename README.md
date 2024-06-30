End-to-End Test Suite

This repository contains an end-to-end test suite for the Swag Labs  using Playwright. The tests follow the Page Object Model (POM) design pattern.

Prerequisites

Before running the tests, ensure you have the following prerequisites installed:

Node.js: Make sure you have Node.js installed on your machine. You can download it from the official website.

Install Dependencies:
npm install

Running Tests
Execute the test suite using the following command:
npx playwright test tests/Home_tes.spec.js

This command will run the end-to-end tests using Playwright. The tests will:

Navigate to the Sauce Labs demo site.
Log in as the standard user.
Add items to the cart.
Verify the cart contents.
Proceed to checkout.
View the test results in the console or any specified test reporter (e.g., Mocha, Jest).

Page Objects
The POM design pattern is used to organize the test code. Page objects are defined in the pages directory. Customize these page objects to match your application’s structure.
