// .env import
require('dotenv').config();

// Import 'sequelize' module
const Sequelize = require('sequelize');
// Mysql
const mysql = require('mysql2');

/*
 * Sequelize DB connection
 */
// (database name, username, password) process.env.DB_PASSWORD
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, // host name
  dialect: process.env.DB_DIALECT, // type of dbms
  define: {
    timestamps: false
}
});

// Export of middleware
module.exports = sequelize;
