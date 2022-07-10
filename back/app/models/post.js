const mongoose = require("mongoose");

// Define a schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: [140, "Message is too long"],
    },
    picture: {
      type: String,
    },
    like: {
      type: String,
      required: true,
      default: 0,
      ref: "User",
    },
    userWhoLiked: {
      type: [String],
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
