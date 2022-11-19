/**
 * Imports
 */
// .env import
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// Import body-parser
const bodyParser = require('body-parser');
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

// Matchimage route
const loginRouter = require('./routes/login');

/*
  Routes use
*/

// Actions route
app.use('/login', loginRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
