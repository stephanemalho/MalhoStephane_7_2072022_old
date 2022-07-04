const mongoose = require("mongoose");

// define a comment schema
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: false,
    default: "Ajouter un commentaire", // valeur par defaut
    trim: true,
    maxlength: [140, "Comment is too long"],
    ref: "User", 
  },
  commenterID: [{
    pseudo: { type: String, required: true }, // pseudo de la personne qui commente
    avatar: { type: String, required: true }, // avatar de l'utilisateur qui a commenté afiché en petit
    createdAt: { type: Date, required: true }, // date de création du commentaire
    isAdmin: { type: Boolean, required: true }, // si l'utilisateur est admin ou non
    isModified: { type: Boolean, required: true }, // si le commentaire a été modifié
    isDeleted: { type: Boolean, required: true }, // si le commentaire a été supprimé
    ref: "User", // reference vers l'utilisateur qui a commenté
  }],
  postID: {
    type: String, // id du post
    required: true,
    ref: "Post",
  },
  userLikes: {
    type: Number,
    default: 0,
    ref: "User",
  },
  userDislikes: {
    type: Number,
    default: 0,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("comment", commentSchema);