// Import validator
const {body} = require('express-validator');

/**
 *  Validations
 */

// Registration validation
const registrationValidation = [
  body('email').isString().isEmail().notEmpty(),
  body('password').isString().notEmpty().isLength({ min: 3 }),
  body('name').isString().notEmpty(),
  body('lastName').isString().notEmpty(),
];

// Login validation
const loginValidation = [
  body('email').isString().isEmail().notEmpty(),
  body('password').isString().notEmpty().isLength({ min: 3 }),
];


// Exports
// eslint-disable-next-line max-len
module.exports = {registrationValidation,
  loginValidation};
