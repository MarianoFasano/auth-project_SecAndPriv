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
const port = process.env.PORT || 5000;

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
// Parse application/json
app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


/**
 * Routes import
 */
// Login route
const loginRouter = require('./routes/login');
// Logout route
const logoutRouter = require('./routes/logout');
// Registration route
const regRouter = require('./routes/registration');
// Verify mail route
const verifyMailRouter = require('./routes/verifymail');
// User data 'manager'
const userRouter = require('./routes/user');
const sequelize = require('./config/db_init');

/*
  Routes use
*/

// Use login route
app.use('/login', loginRouter);
// Use login route
app.use('/logout', logoutRouter);
// Use registration route
app.use('/registration', regRouter);
// Use verifymail route
app.use('/verifymail', verifyMailRouter);
// Use user route
app.use('/user', userRouter);

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
app.listen(port, async () => {
  // Synchronizes db tables
  await sequelize.sync();
  console.log(`Example app listening on port ${port}`);
});
