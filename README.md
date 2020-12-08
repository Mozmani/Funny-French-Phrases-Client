# Learn Funny French Phrases (Client)

this application can be used to learn funny french phrases with spaced repetition.

## Tech Stack
* React
* Node.js
* PostgreSQL

![dev-view](https://github.com/Mark-The-Dev/Funny-French-Phrases-Client/blob/master/public/LFF.png?raw=true)
## How to Run

Git Clone this and the Learn Funny French Phrase server from github,
npm install both,
run the server and run the client.
(To run locally use localhost link with server!) 


## Links
* [Client Repo](https://github.com/Mark-The-Dev/Funny-French-Phrases-Client)
* [Server / API repo](https://github.com/Mark-The-Dev/Learn-Funny-French-Phrases-Server)
* [Live Link](https://client-snowy.vercel.app/login)


## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.

## Contributor

Mark Marcello
