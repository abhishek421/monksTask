const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    author: {
      type: String,
      index: true,
    },
    text : String,
    comments: Number,
    views: Number,
    shares: Number,
    final_score: Number,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
