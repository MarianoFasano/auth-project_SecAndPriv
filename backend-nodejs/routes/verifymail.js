/**
 * Verify email route
 */

/**
 * Libraries import
 */
// .env import
require('dotenv').config();
// JsonWebToken
const jwt = require('jsonwebtoken');

// Router - is a little express app
const express = require('express');
const router = express.Router();

/**
 * Models import
 */
// Verification import
const Verification = require('../models/verification');


/**
 * Verify the account
 */
 router.get('/:token', async (req, res) => {
    try {
      const { user: { email } } = jwt.verify(req.params.token, process.env.MAIL_TOKEN_SECRET);
      const verification = await Verification.findOne({where: {token: req.params.token}});
      // Update verify flag
      verification.verify = '1';
      // Save updated verification element
      verification.save();
    } catch (e) {
      res.send('error');
    }
  
    return res.redirect('http://localhost:3000/');
  });

// Exports
module.exports = router;