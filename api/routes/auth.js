const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// AUTHETICATION & VERIFICATION
const salt = bcrypt.genSaltSync(10);
const secret = 'abcxyz';

// CREATE User Endpoint
router.post('/signup', async (req, res) => {
   const { username, email, password } = req.body;
   try {
       const userDoc = await User.create({
           username,
           email,
           password: bcrypt.hashSync(password, salt)
       });
       res.json(userDoc);
   } catch (error) {
       console.log(error);
       res.status(400).json(error);
   }
});

// LOGIN User Endpoint
router.post('/login', async (req, res) => {
   const { username, password } = req.body; // Need to encrypt password
   const userDoc = await User.findOne({ username });
   const passwordOk = bcrypt.compareSync(password, userDoc.password);
   if (passwordOk) { // checking if logged in
       jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
           if (error) throw error;
           res.cookie('token', token).json({
               id: userDoc._id, // getting user id
               username,
           });
       });
   } else {
       res.status(400).json('wrong credentiials');
   }
});

// LOGOUT User Endpoint
router.post('/logout', (req, res) => {
   res.cookie('token', '').json('ok');
});

module.exports = router;