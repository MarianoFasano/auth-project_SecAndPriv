/**
 * Libraries import
 */
// .env import
require('dotenv').config();
// Nodemailer
const nodemailer = require('nodemailer');


/**
 * Registration route
 */
// Router - is a little express app
const express = require('express');
const router = express.Router();

/**
 * Models import
 */
// User import
const User = require('../models/user');
// Verification import
const Verification = require('../models/verification');
const mailTokenGenerator = require('../utilities/mailTokenGenerator');

/**
 * Utilities import
 */
// Password generator
const passwordGenerator = require('../utilities/passwordGenerator');

/**
 * Create new user
 */
router.post('/', async (req, res) => {
        // Check if the user already exists
        const oldUser = await User.findOne({where: {email: req.body.email}});

        if (oldUser != null) {
          res.status(400).json({message: `A user with ${req.body.email} email address already exists`});
        } else {
        // If doesn't exist, create it
        /**
         * Password
         */
          const hashedPassword = await passwordGenerator(req.body.password);
          // Create User
          const newUser = await User.create(
              {
                policy: 'User',
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
            /*port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SECURE,*/
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_USER_PASS,
            },
            /*tls: {
              rejectUnauthorized: false,
              secureProtocol: "TLSv1_method",
            }*/
          });

          // Send the mail
          const url = `http://localhost:5000/verifymail/${mailToken.token}`;
          const mailOptions = {
            from: process.env.MAIL_USER,
            to: req.body.email,
            subject: 'Verify your account',
            html: `Please click this email to verify your account: <a href="${url}">${url}</a>`,
          }

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