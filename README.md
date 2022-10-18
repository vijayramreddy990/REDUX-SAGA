## required dependencies

## `npm install -g json-server`

## `npm install --save axios react-redux redux redux-logger redux-saga react-toastify mdb-react-ui-kit react-router-dom`

## import the following commands in index.js file

import 'mdb-react-ui-kit/dist/css/mdb.min.css'

## add the following link in index.html file

<link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />

## create a local json server

do this by creating a new file db.json in the app directory
add the following script in package.json file

"scripts": {
...
"server": "json-server --watch db.json --port 5000",
...
},

## Available Scripts

In the project directory, you can run:

### `npm start`
