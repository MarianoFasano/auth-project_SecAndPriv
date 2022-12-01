/**
 ** Logout route
*/
// .env import
require('dotenv').config();
// Router - is a little express app
const express = require('express');
const router = express.Router();

// Logout user, revoke the token
router.get('/', (req, res) => {
    // Response
    res.status(200).json({
        message: 'Successfully logged out'
    });
});

// Export
module.exports = router;