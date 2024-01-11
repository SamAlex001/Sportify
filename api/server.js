const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const commentRoute = require('./routes/comment');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');
const app = express();

// PORT for server to run/listen
const PORT = 4000

// MIDDLEWARES
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use("/comment",commentRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/user", userRoute);

// MONGODB Password: 8OTq3CcEClnYJR0m
mongoose.connect('mongodb+srv://sam:8OTq3CcEClnYJR0m@sportify.aluisxu.mongodb.net/?retryWrites=true&w=majority')

app.listen(PORT, () => {
    console.log(`Server Running at Port:${PORT}`);
});