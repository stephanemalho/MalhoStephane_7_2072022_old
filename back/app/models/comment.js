const mongoose = require("mongoose");

// define a comment schema
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    default: "Ajouter un commentaire", // valeur par defaut
    trim: true,
    maxlength: [140, "Comment is too long"],
  },
  userId: [
    {
      ref: "User", // reference vers l'utilisateur qui a commenté
    },
  ],
  postId: {
    type: String, // id du post
    required: true,
    ref: "Post",
  },
  userLikes: {
    type: Number,
    default: 0,
    ref: "User",
  },
  userWhoLiked: {
    type: [String],
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", commentSchema);
