/**
 ** Login route
*/
// Router - is a little express app
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.body);
    res.json({message:"Hai raggiunto il get di backend"});
});

// Export
module.exports = router;