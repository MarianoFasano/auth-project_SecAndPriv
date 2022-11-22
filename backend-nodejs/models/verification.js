/**
 * User Sequelize Model
 * Extending model will let custom the class in the future
 * https://sequelize.org/docs/v6/core-concepts/model-basics/#extending-model
 */

// Destructuring from sequelize require
const {Sequelize, DataTypes, Model} = require('sequelize');
// Import db configurations
const sequelize = require('../config/db_init');
// Imports for db relationships


class User extends Model { }

User.init({
  // Model attributes are defined here
  id:
  {
    type: DataTypes.BIGINT.UNSIGNED, // BIGINT UNSIGNED (UN in MySQL Workbench)
    autoIncrement: true, // autoincrement id (AI in MySQL Workbench)
    primaryKey: true, // id is the primary key (PK in MySQL Workbench)
  },
  email:
  {
    type: DataTypes.STRING(250), // VARCHAR(250)
  },
  token:
  {
    type: DataTypes.STRING(250), // VARCHAR(250)
  },
  verify:
  {
    type: DataTypes.STRING(100), // VARCHAR(100)
  },
  createdAt:
  {
    field: 'created_at', // Sequelize in camelCase, db in snake_case
    type: 'TIMESTAMP', // timestamp
  },
  updateAt:
  {
    field: 'updated_at', // Sequelize in camelCase, db in snake_case
    type: 'TIMESTAMP', // timestamp
  },
},
{
  // Other model options go here
  sequelize, // Pass the connection instance
  modelName: 'Verification', // Model name
});

/**
* DB relationship, Sequelize's associations
*/

// Module export
module.exports = Verification;

/**
 * TIPS
 */
// The defined model is the class itself
// console.log(User === sequelize.models.User); // true

/**
     * Override the mail body for reset password notification mail.
     */
/* public function sendPasswordResetNotification($token)
 {
     $this->notify(new \App\Notifications\MailResetPasswordNotification($token));
 }*/
