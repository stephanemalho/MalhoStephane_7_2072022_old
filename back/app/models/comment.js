const mongoose = require("mongoose");

// define a comment schema
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: false,
    default: "", // default value
    trim: true,
    maxlength: [140, "Comment is too long"],
  },
  commenterID: [{
    pseudo: { type: String, required: true }, // pseudo de la personne qui commente
    avatar: { type: String, required: true }, // avatar de l'utilisateur qui a commenté afiché en petit
    createdAt: { type: Date, required: true }, // date de création du commentaire
    isAdmin: { type: Boolean, required: true }, // si l'utilisateur est admin ou non
    isModified: { type: Boolean, required: true }, // si le commentaire a été modifié
    isDeleted: { type: Boolean, required: true }, // si le commentaire a été supprimé
  }],
  posterID: {
    type: String, // id du posteur
    required: true,
  },
  postID: {
    type: String, // id du post
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", commentSchema);