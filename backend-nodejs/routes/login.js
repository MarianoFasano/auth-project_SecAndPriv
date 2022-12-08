/**
 ** Login route
*/
// .env import
require('dotenv').config();
// Router - is a little express app
const express = require('express');
const router = express.Router();

/**
 * Utilities/libraries import
 */
// bcrypt
const bcrypt = require('bcrypt');
// Token generator
const tokenGenerator = require('../utilities/tokenGenerator');
// Validations import
const {loginValidation} = require('../utilities/validation');
// Middlewares
const validateRequest = require('../middlewares/validate_request');


/**
 * Models import
 */
// User import
const User = require('../models/user');
// Verification import
const Verification = require('../models/verification');

router.post('/',
    loginValidation,
    validateRequest,
    async (req, res) => {
        /**
         * What happen here?
         * 
         * The user attempt the login, than the route check if the user exists and if he/she
         * confirmed his/her account by verify the email.
         * 
         * Negative: send the user to a page that reminds him to verify the account by follow
         * the instructions received by mail
         * 
         * Affermative: the user exists and has a verified account. He/she gets a token to
         * access.
         */

        const email = req.body.email;
        const password = req.body.password;

        /**
         * User check
         */
        // Check if the user exists
        const userInCheck = await User.findOne({where: {email: req.body.email}});

        // The user does not exist - resource 'not found' 404
        if (userInCheck == null) {
        return res.status(404).send({
            message: `A user with ${req.body.email} email address does not exist`,
            problem: 'user does not exist',
        });
        } 
                
        /**
         * Verification check
         */
        // The user exists, than check if his/her account is verified or not
        const accountInCheck = await Verification.findOne({where: {email: req.body.email}});
                
        /**
        * Password check
        * The user exists and his/her account is verified, if the password is correct we gave him a token
        */
                
        // Check the password
        if (await bcrypt.compare(password, userInCheck.password)){

            // Right password

            // The account is not verified, so verify state is '0' - user 'unathorized', 'unauthenticated' 401
            if (accountInCheck.verify === process.env.VERIFY_PROD){
                return res.status(401).send({
                message: `Hello ${userInCheck.name}, we know you, but you have not verified your account. Please verify it by the mail we sent to you during your the registration and than attempt once again the login :) `,
                problem: 'verification',
                });
            } else {
                // Create token
                const token = tokenGenerator(userInCheck);
                // Response with the token
                return res.status(200).json({
                    name: userInCheck.name,
                    token: token.token,
                    token_type: 'Bearer',
                    expires_at: token.expiresIn,
                    message: `Hello ${userInCheck.name}, you logged in successfully`,
                    problem: '',
                });
            }
        } else{
            // Wrong password
            return res.status(401).send({
                message: `Hello ${userInCheck.name}, we know you, but your password is incorrect`,
                problem: 'password',
            });
        }
});

// Export
module.exports = router;