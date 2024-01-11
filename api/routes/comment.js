const express = require('express');
const Users = require('../models/Users');
const Post = require('../models/Post');
const router = express.Router();
const Comment = require('../models/Comment');

// POST Comment Endpoint
router.post("/post/comments", async (req, res) => {
   try {
      const newComment = new Comment(req.body)
      const savedComment = await newComment.save()
      res.status(200).json(savedComment)
   }
   catch (err) {
      res.status(500).json(err)
   }
});

// UPDATE Comment Endpoint
router.put("/:id", async (req, res) => {
   try {
      const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      res.status(200).json(updatedComment)
   }
   catch (err) {
      res.status(500).json(err)
   }
});

// DELETE Comment Endpoint
router.delete("/:id", async (req, res) => {
   try {
      await Comment.findByIdAndDelete(req.params.id)

      res.status(200).json("Comment has been deleted!")
   }
   catch (err) {
      res.status(500).json(err)
   }
});

// GET Post Comments Endpoint
router.get("/post/:postId", async (req, res) => {
   try {
      const comments = await Comment.find({ postId: req.params.postId })
      res.status(200).json(comments)
   }
   catch (err) {
      res.status(500).json(err)
   }
});

module.exports = router