This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## Table of Contents

- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
- [Design Oveerview](#design-overview)

## Technology Stack

This test project is based on the following technologies:
* [`react.js`](https://reactjs.org/)
* [`Material-UI`](https://www.material-ui.com/#/) component library
* [`axios`](https://github.com/axios/axios) HTTP client
* [`ESlint`](https://eslint.org/) linting library
* [`Jest`](https://facebook.github.io/jest/) & [`Enzyme`](http://airbnb.io/enzyme/) for tests

## Folder Structure

This project structure looks like this:

```
site-minder-email-client/
  |____.eslintrc.json
  |____package.json
  |____public
  | |____favicon.ico
  | |____index.html
  | |____manifest.json
  |____README.md
  |____src
  | |____App.css
  | |____App.js
  | |____App.test.js
  | |____components
  | | |____autoCompleteEmailInput.js
  | | |____emailAddressesInput.js
  | | |____emailSender.css
  | | |____emailSender.js
  | | |____emailSender.test.js
  | | |____emailSubject.js
  | | |____emailText.js
  | |____index.css
  | |____index.js
  | |____logo.svg
  | |____registerServiceWorker.js
  | |____services
  | | |____emailConfig.js
  | | |____emailService.js
  | |____setupTests.js
```

My codes are mainly under both ***`src/components`*** and ***`src/services`*** folders. In addition, the generated ***`app.js`*** was changed to inject ***`EmailSender`*** component. All the others are genereated by ``

- *`src/components`* - hosts email related components

```
site-minder-email-client/
  |____src
  | |____components
  | | |____autoCompleteEmailInput.js
  | | |____emailAddressesInput.js
  | | |____emailSender.css
  | | |____emailSender.js
  | | |____emailSender.test.js
  | | |____emailSubject.js
  | | |____emailText.js
```

- *`src/service`* services talking to the back-end mail server

```
site-minder-email-client/
  |____src
  | |____services
  | | |____emailConfig.js
  | | |____emailService.js
```

## Setup Env
To set up the project, you will need to have `node.js` installed locally. What's more, you also needs to check out the mock mail server back-end.
- Check out this project
```
git clone https://github.com/AX1818/site-minder-email-client.git
# enter the project folder
cd site-minder-email-client
# install libs and modules
npm install
```

- Check out the mock mail server

```
git clone https://github.com/AX1818/site-minder-email-server.git
cd site-minder-email-server
# install libs and modules
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Design Overview

This project is a simple Single Page Application with the following requirements:

- No Authentication required
- No Support for attachments
- Plain text support only
- Work with a mock email server which can take post request from this SPA to send email

The main UI is a email-sending form, which supprots the stanard email elements, include `to`, `cc`, `bcc`, `text`.<br>
Inside the form, there are two buttons - `NEW` and `SEND`.

Cliking `SEND` button will do two operations:
- Check if there is no email address input or any invalid address. If so, stop sending emaila and show an error message on the page.
- Send the eamil as a PUT request to the mail server and show the result on the page.

> Note: the current code does not chck the blank `subject` or `email text` which is easy to do though. This check and related user interactions must be done in a real product.

Clicking `NEW` button will clean up the form to be ready for a new email.

The `to`, `cc`, and `bcc` use the same `EmailAddressInput` component. It provides a user-friendly feature to support auto-search email address from a contact list that is curently a mock list. It supports search by partial user name.


## Todo
Due to the time limit, there are a number of work to be done.

- `Authentication` function - to authenticate users and use security token for sending emails
- Use `HTTPS` for the communicaiton between the client and server
- More friendly interaction such as message dialogs.
- Support `contact list` function - After authentiation, a contact list can be fetched for the current user. Thus, when they input email adderss, an auto-complete function can be providd. The current solution is using a mock contact list.
- A commercial mailbox supprots more functions, such as junk emails, history emails etc.
- More tests include integratin tests