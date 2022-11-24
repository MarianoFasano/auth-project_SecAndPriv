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
const verification = require('./verification');


class User extends Model { }

User.init({
  // Model attributes are defined here
  email:
  {
    type: DataTypes.STRING(250), // VARCHAR(250)
    primaryKey: true, // id is the primary key (PK in MySQL Workbench)
  },
  name:
  {
    type: DataTypes.STRING(250), // VARCHAR(250)
  },
  lastName:
  {
    field: 'last_name', // Sequelize in camelCase, db in snake_case
    type: DataTypes.STRING(250), // VARCHAR(250)
  },
  password:
  {
    type: DataTypes.STRING(250), // VARCHAR(250)
  },
  birthday:
  {
    type: DataTypes.DATE, // datetime
  },
  description:
  {
    type: DataTypes.STRING(2000), // VARCHAR(2000)
  },
  policy:
  {
    type: DataTypes.STRING(20), // ('Admin', 'Superadmin', 'User')
  },
  token:
  {
      type: DataTypes.STRING(250), // VARCHAR(250)
  },

},
{
  // Other model options go here
  sequelize, // Pass the connection instance
  modelName: 'User', // Model name
});

/**
* DB relationship, Sequelize's associations
*/
User.associate = (models) => {
// Verification
  User.hasMany(models.Verification,
      {
        onUpdate: 'RESTRICT',
        onDelete: 'CASCADE',
        foreignKey:
  {
    name: 'email',
  },
      });
  // Return
  return User;
};

// Module export
module.exports = User;

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
