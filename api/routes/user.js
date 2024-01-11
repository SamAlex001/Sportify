const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// AUTHETICATION & VERIFICATION
const salt = bcrypt.genSaltSync(10);
const secret = 'abcxyz';

// GET User Info Endpoint: Check Login Status
router.get('/profile', (req, res) => {
   const { token } = req.cookies;
   jwt.verify(token, secret, {}, (error, info) => {
       if (error) throw error.response; // Throw caught error
       res.json(info); // Display response information
   });
});

module.exports = router;