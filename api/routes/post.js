const express = require('express');
const fs = require('fs');
const multer = require('multer');
const Post = require('../models/Post');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const uploadMiddleware = multer({ dest : './uploads' });

// AUTHETICATION & VERIFICATION
const salt = bcrypt.genSaltSync(10);
const secret = 'abcxyz';

// MIDDLEWARE
app.use("/uploads", express.static(path.join(__dirname, './uploads'))); // to access img from uploads folder

// GET Post Endpoint
router.get('/getpost', async (req, res) => {
   res.json(
      await Post
         .find() // find all posts
         .populate('author', ['username']) // get only username of author
         .sort({ createdAt: -1 }) // sort latest to oldest post
         .limit(20) // limit to latest 20 posts: avoid overloading
   );
});

// OPEN/VIEW Post Endpoint
router.get('/viewpost/:id', async (req, res) => {
   const { id } = req.params;
   const postDoc = await Post.findById(id).populate('author', ['username']);
   res.json(postDoc);
});

// CREATE Post Endpoint
router.post('/createpost', uploadMiddleware.single('file'), async (req, res) => { // CreatePost.jsx: 'file' -> data.set('file', files)
   const { originalname, path } = req.file;
   const parts = originalname.split('.');
   const extension = parts[parts.length - 1]
   const newPath = path + '.' + extension;
   fs.renameSync(path, newPath);
   const { token } = req.cookies;
   jwt.verify(token, secret, {}, async (error, info) => {
      if (error) throw error; // Throw caught error
      const { title, summary, content } = req.body;
      const postDoc = await Post.create({
         title,
         summary,
         content,
         cover: newPath,
         author: info.id
      });
      res.json(postDoc);
   });
});

// UPDATE Post Endpoint
router.put('/updatepost', uploadMiddleware.single('file'), async (req, res) => {
   let newPath = null;
   if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const extension = parts[parts.length - 1]
      newPath = path + '.' + extension;
      fs.renameSync(path, newPath);
   }
   const { token } = req.cookies;
   jwt.verify(token, secret, {}, async (error, info) => {
      if (error) throw error;
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
         return res.status(400).json('Invalid Author for Post');
      }
      await postDoc.updateOne({
         title,
         summary,
         content,
         cover: newPath ? newPath : postDoc.cover,
      });
      res.json(postDoc);
   });
});

// DELETE Post Endpoint
router.delete('/deletepost', async (req, res) => {
   res.json('ok');
})

module.exports = router