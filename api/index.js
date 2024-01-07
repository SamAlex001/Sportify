const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/Users');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const PORT = 4000

// middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

// encryption keys
const salt = bcrypt.genSaltSync(10);
const secret = 'hello';

// DB Password: 8OTq3CcEClnYJR0m
mongoose.connect('mongodb+srv://sam:8OTq3CcEClnYJR0m@sportify.aluisxu.mongodb.net/?retryWrites=true&w=majority')

// Endpoint for Sign Up
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            email,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Endpoint for Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordOk) {
        // logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
            if (error) throw error;
            res.cookie('token', token).json('ok');
        });
    } else {
        res.status(400).json('wrong credentiials');
    }
});

// Endpoint to check login status
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (error, info) => {
        if (error) throw error; // Throw caught error
        res.json(info); // Display response information
    })
    res.json(req.cookies);
});

app.listen(PORT, () => {
    console.log(`Server Running at Port:${PORT}`);
});