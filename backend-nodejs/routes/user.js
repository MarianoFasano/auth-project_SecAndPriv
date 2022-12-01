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
// Auth Middleware
const authMiddleware = require('../middlewares/tokenMiddleware');

/**
 * Models import
 */
// User import
const User = require('../models/user');

// Default user, in case of problem
const defaultUser = {
    email: 'unknow userEmail',
    name: 'userName',
    lastName: 'userLastName',
    birthday: new Date(),
    description: 'userDescription',
    policy: "unknow userPolicy",
};

// GET
router.get('/', authMiddleware, async (req, res) => {

    /**
     * Token verification
     */
     console.log(req.headers);
    // Authorization header
    const authHeader = req.headers['authorization'];
    // Get the token if exist the auth header, the token is the second part of auth header
    const token = authHeader && authHeader.split(' ')[1];
    // If token is null
    if (token == null) {
        return res.sendStatus(401);
    }
    // Decode the token
    const payload = jsonwebtoken.decode(token);
    // Extract the user email from the payload (payload.sub)
    const userEmail = payload.sub;

    // Return the user after the token verify
    const user = await User.findByPk(userEmail);

    // Check if user was correctly found
    if (user == null){
        return res.status(404).send({
            message: 'User not found in the db',
        })
    }

    // Switch case for user role/policy
    switch(user.policy){
        case 'User':
            return res.status(200).send({
                user: user,
            });
            break;
        default:
            return res.status(400).send({
                user: defaultUser,
            });
    }

});

// Export
module.exports = router