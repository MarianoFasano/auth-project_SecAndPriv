/**
 * User route
 */

// .env import
require('dotenv').config();
// Router - is a little express app
const express = require('express');
const router = express.Router();
// Jwt import
const jsonwebtoken = require('jsonwebtoken');

/**
 * Models import
 */
// User import
const User = require('../models/user');

// GET
router.get('/', async (req, res) => {

    /**
     * Token verification
     */
    // Authorization header
    const authHeader = req.headers['authorization'];
    // Get the token if exist the auth header, the token is the second part of auth header
    const token = authHeader && authHeader.split(' ')[1];
    // If token is null
    if (token == null) return res.sendStatus(401);
    // Decode the token
    const payload = jsonwebtoken.decode(token);
    // Extract the user email from the payload (payload.sub)
    const userEmail = payload.sub;

    // Return the user after the token verify
    const user = await User.findByPk(userEmail);

});

// Export
module.exports = router