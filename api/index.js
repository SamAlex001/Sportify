const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/Users');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');

// PORT for server to run/listen
const PORT = 4000

// middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads')); // to access img from uploads folder
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
    const { username, password } = req.body; // Need to encrypt password
    const userDoc = await User.findOne({ username });
    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordOk) {
        // logged in
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

// Endpoint to check login status
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (error, info) => {
        if (error) throw error; // Throw caught error
        res.json(info); // Display response information
    });
    // res.json(req.cookies);
});

// Endpoint for logout
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});

// Endpoint for create post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    //CreatePost.jsx: 'file' -> data.set('file', files)
    const { originalname, path } = req.file; // placing file to originalname
    const parts = originalname.split('.'); // Spliting originalname to name: Everything before .ext
    const extension = parts[parts.length - 1] // extension part: Everything after FileName.
    const newPath = path + '.' + extension; // File Path
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (error, info) => {
        if (error) throw error; // Throw caught error

        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title, summary, content, cover: newPath, author: info.id
        });

        res.json(postDoc);
    });
});

// Endpoint to get post(s)
app.get('/post', async (req, res) => {
    res.json(
        await Post
            .find() // find all posts
            .populate('author', ['username']) // get only username of author
            .sort({createdAt: -1}) // sort latest to oldest post
            .limit(20) // limit to latest 20 posts: avoid overloading
    );
})

app.listen(PORT, () => {
    console.log(`Server Running at Port:${PORT}`);
});