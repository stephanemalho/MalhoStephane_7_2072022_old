const mongoose = require("mongoose"); // import mongoose
const { isEmail } = require("validator"); // npm i validator

// mise en structure du schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 64,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
      validate: [ isEmail , "Email invalide" ],
    },
    pseudo: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      trim: true,
      unique: true,
      index: true,
      default: "Anonyme",
    },
    name: { type: String },
    nested: {
      firstName: { type: String },
      lastName: { type: String },
    },
    job: { 
      type: String,
      enum: ["Nouveau membre","Developpeur", "Chargé de clientèle","Courtier","Guichetier", "Chargé des ressources humaines","Directeur","","other","Télé vendeur"],
      default: "Nouveau membre",
    },
    age: { type: Number },
    avatar: {
      type: String,
      default: "../assets/images/avatar.png",
    },
    description: {
      type: String,
      default: "",
      maxlength: 255,
      trim: true,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: Number,
      default: 0,
    },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    updated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// déclaration du model de cryptage du mot de passe
userSchema.pre("save",async function (next) {
  const salt = await bcrypt.genSalt(10); //salage du mot de passe
  this.password = await bcrypt.hash(this.password, salt); // générer le hash du mot de passe
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password,user.password);
    if (auth) {
      return user;
    } 
    throw new Error("Invalid password");
  }
  throw new Error("Invalid email");
};

// déclaration du model
const userModel = mongoose.model("User", userSchema);
// export du model
module.exports = userModel;
