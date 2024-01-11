const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CommentSchema = new mongoose.Schema({
   comment: {
      type: String,
      required: true,
   },
   author: {
      type: String,
      required: true
   },
   postId: { type: Schema.Types.ObjectId, ref: 'Post' },
   userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
   timestamps: true
});

module.exports = mongoose.model("Comment", CommentSchema)