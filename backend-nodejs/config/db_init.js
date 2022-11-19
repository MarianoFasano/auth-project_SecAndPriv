// .env import
require('dotenv').config();
/* eslint-disable max-len */
// Import 'sequelize' module
const Sequelize = require('sequelize');

/*
 * Sequelize DB connection
 */
// (database name, username, password)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.HOST, // host name
  dialect: process.env.DB_DIALECT, // type of dbms
});

// Export of middleware
module.exports = sequelize;
