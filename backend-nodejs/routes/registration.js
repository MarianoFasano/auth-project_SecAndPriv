/**
 * Registration route
 */
const express = require('express');
const router = express.Router();

/**
 * Models import
 */
// User import
const User = require('../models/user');
// Verification import
const Verification = require('../models/verification');

/**
 * Utilities import
 */
// Password generator
const passwordGenerator = require('../utilities/passwordGenerator');

/**
 * Create new user
 */
router.post('/', async (req, res) => {
        // Check if the user already exist
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

          // Fill the verifications table
          const newVerification = await Verification.create(
            {
              email: req.body.email,
              token: 'tokenExample',
              verify: '0',
            },
          );
          // Response
          res.status(201).json({message: 'Successfully created user'});
        }
});

router.get('/', (req, res) => {
  res.json({message:"Hai raggiunto il get di backend"});
});

// Exports
module.exports = router;