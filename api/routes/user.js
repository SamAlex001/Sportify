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
    try {
        const { token } = req.cookies;

        // VERIFY JWT Token
        jwt.verify(token, secret, {}, (error, info) => {
            if (error) { // Throw caught error
                console.error('JWT Verification Error:', error);
                res.status(401).json({ error: 'Unauthorized' });
            }
            res.json(info); // info => JWT response
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ 'error': 'Internal Server Error' })
    }
});

// GET User Info by ID Endpoint
router.get('/viewprofile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;

        // VERIFY JWT Token
        jwt.verify(token, secret, {}, async (error, info) => {
            if (error) {
                console.error('JWT Verification Error:', error);
                res.status(401).json({ error: 'Unauthorized' });
            } else {
                try {
                    const userDoc = await User.findById(id).populate('username');
                    if (!userDoc) {
                        res.status(404).json({ error: 'User not found' });
                    } else {
                        // Combine userDoc => DB response and info => JWT response into a single object
                        const responseData = { userDoc, info };
                        res.json(responseData);
                    }
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/updateprofile/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { token } = req.cookies;
        jwt.verify(token, secret, async (error, info) => {
            if (error) {
                console.log('JWT Verification Error: ', error);
                res.status(401).json({ error: 'Unauthorized' });
            } 
            else {
                const { username, email, password } = req.body;
                const userDoc = await User.findById(id);
                
                // VERIFYING User & User Details
                if (!userDoc) {
                    res.status(400).json({ error: 'User not found' });
                    return;
                }
                const isUser = JSON.stringify(userDoc._id) === JSON.stringify(info.id);
                if (!isUser) {
                    res.status(401).json({ error: 'Unauthorized' });
                    return;
                }

                // UPDATE User Details
                userDoc.username = username;
                userDoc.email = email;
                userDoc.password = bcrypt.hashSync(password, salt);
                await userDoc.save();

                res.status(200).json({ message: 'Profile updated successfully' });
            }
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;