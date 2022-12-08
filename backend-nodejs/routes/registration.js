// .env import
require('dotenv').config();
/**
 * Registration route
 */
// Router - is a little express app
const express = require('express');
const router = express.Router();
/**
 * Libraries import
 */

// Nodemailer
const nodemailer = require('nodemailer');
// Axios
const axios = require('axios');
// Nodejs-fetch
const fetch = require('node-fetch');

/**
 * Models import
 */
// User import
const User = require('../models/user');
// Verification import
const Verification = require('../models/verification');
// Middlewares
const validateRequest = require('../middlewares/validate_request');
// Validations import
const {registrationValidation} = require('../utilities/validation');


/**
 * Utilities import
 */
// Password generator
const passwordGenerator = require('../utilities/passwordGenerator');
// Token generator utility
const mailTokenGenerator = require('../utilities/mailTokenGenerator');
/**
 * Create new user
 */
router.post('/',
  registrationValidation,
  validateRequest,
  async (req, res) => {
        // Check if the user already exists
        const oldUser = await User.findOne({where: {email: req.body.email}});
        // If oldUser is not null, it means that a user with the passed e-mail already exist
        if (oldUser != null) {
          res.status(400).send({message: `A user with ${req.body.email} email address already exists`});
        } else {
          // Get the recaptcha token
          const { token } = req.body;
          // Recatpcha verification
          const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`, {
            method: 'post',
          });

          // Extract the response of the recaptcha verification
          const data = await response.json();
          const success = data.success;
          
          // If success is false, it means that the recaptcha verification is failed
          if(!success){
            return res.status(400).send({
              message: "Invalid Captcha. Try again."
            });
          };
          // If doesn't exist, create it
          /**
          * Password
          */
          const hashedPassword = await passwordGenerator(req.body.password);
          // Create User
          const newUser = await User.create(
              {
                policy: process.env.DEFAULT_USER,
                email: req.body.email,
                name: req.body.name,
                lastName: req.body.lastName,                
                password: hashedPassword,
                birthday: req.body.birthday,
                description: req.body.description,
              },
          );

          // Token for email
          const mailToken = mailTokenGenerator(newUser);

          // Fill the verifications table
          const newVerification = await Verification.create(
            {
              email: req.body.email,
              token: mailToken.token,
              verify: '0',
            },
          );

          // Nodemailer configuration
          const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,

            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_USER_PASS,
            },

          });

          /**
           * Send the mail
           */
          // URL
          const url = `http://localhost:5000/verifymail/${mailToken.token}`;
          // Mail options
          const mailOptions = {
            from: process.env.MAIL_USER,
            to: req.body.email,
            subject: 'Verify your account',
            html: `Click to verify: <a href="${url}">Verify your account</a>`,
          }
          // Send the e-mail
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log('Error:' + error.message);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          // Response
          res.status(201).json({message: 'Successfully created user'});
        }
});

// Exports
module.exports = router;