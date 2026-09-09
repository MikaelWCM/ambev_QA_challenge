# Ambev QA Automation Challenge

Automation testing project developed as part of the Ambev QA technical challenge.

The project uses **Cypress** and **JavaScript** to validate user creation scenarios through both the **ServeRest UI and REST API**.

## Technologies

- JavaScript
- Cypress
- Node.js
- GitHub Actions
- ServeRest

## Test Coverage

The project contains **6 automated tests**, divided between UI and API testing.

### UI Tests

The frontend test suite validates the following scenarios:

1. **Access the user registration page**
   - Opens the login page
   - Navigates to the user registration page
   - Validates that the registration page is displayed

2. **Create a user successfully**
   - Fills in the user registration form
   - Submits a new user
   - Validates the success message displayed to the user

3. **Attempt to create a user with an existing email**
   - Creates the test precondition through the API
   - Attempts to register a user with an existing email through the UI
   - Intercepts and validates the API response
   - Validates the `400` status code
   - Validates the duplicate email error message in both the API response and UI

### API Tests

The API test suite validates the following scenarios:

1. **Create a user successfully**
   - Sends a `POST /usuarios` request
   - Validates the `201` status code
   - Validates the success message
   - Validates that an `_id` is returned

2. **Attempt to create a user with an existing email**
   - Creates a user
   - Attempts to create another user using the same email
   - Validates the `400` status code
   - Validates the duplicate email error message

3. **Retrieve a user by ID**
   - Creates a user dynamically
   - Retrieves the generated user ID
   - Sends a `GET /usuarios/{id}` request
   - Validates the `200` status code
   - Validates the returned user data against the data used during creation
   
## Project Structure

```text
cypress/
└── e2e/
    ├── api/
    │   └── createUser.cy.js
    │
    └── frontend/
        └── createUser.cy.js

.github/
└── workflows/
    └── cypress.yml
```

## Installation

Clone the repository:

```bash
git clone https://github.com/MikaelWCM/ambev_QA_challenge.git
```

Navigate to the project:

```bash
cd ambev_QA_challenge
```

Install the dependencies:

```bash
npm ci
```

## Running the Tests

### Run all tests

```bash
npx cypress run
```

### Run API tests

```bash
npm run test:api
```

### Run UI tests

```bash
npm run test:e2e
```

### Open Cypress

```bash
npx cypress open
```

## Continuous Integration

The project uses **GitHub Actions** for continuous integration.

The CI pipeline automatically executes the automated test suites on:

- Pushes to the `main` branch
- Pull requests targeting the `main` branch

## Application Under Test

The tests use the ServeRest application:

- Frontend: `https://front.serverest.dev`
- API: `https://serverest.dev`

## Author

**Mikael Miranda**

QA Engineer
