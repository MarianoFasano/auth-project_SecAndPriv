/*
** Title: Auth Projects - Security and Privacy by Design
** Authors: Mariano Fasano and Giuseppe Schipani
** Year: 2022-2023
*/

/**
 * Imports
 */
// .env import
require('dotenv').config();
// Import 'espress' module
const express = require('express');
// Import body-parser
const bodyParser = require('body-parser');
// Import 'mysql' module
const mysql = require('mysql2');
// Import module for database
const database = require('./config/db_init');
// Start express app
const app = express();
// Port number in the variable 'port'
const port = process.env.PORT || 4000;

/**
* Cors import and configuration
*/
const cors = require('cors');
// Cors options, origin is the angular localhost and port
const corsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
  optionSuccessStatus: 200,
};
// Use of cors
app.use(cors(corsOptions));
// Use of bodyParser
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// Parse application/json
app.use(bodyParser.json());

/**
 * Routes import
 */
// Matchimage route
const loginRouter = require('./routes/login');

/*
  Routes use
*/

// Actions route
app.use('/login', loginRouter);

// Check database connection
try {
  database.authenticate(); // originally there was an 'await' before
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Server start listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
