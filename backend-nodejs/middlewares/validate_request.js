// Import 'express' module
const express = require('express');
// Import validator
const {validationResult} = require('express-validator');

// Validation function
const validateRequest = function validaterequest(req, res, next) {
  // Validation errors
  const errors = validationResult(req);
  // Check if there are any errors
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  // No errors accurred
  next();
};

// Export module
module.exports = validateRequest;
