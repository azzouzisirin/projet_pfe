const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    postId: {
      type: Array,
      default: [],
    },
    profilePicture: {
      type: String,
      default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    }, 
    
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Page", PageSchema);