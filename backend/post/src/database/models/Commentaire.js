const mongoose = require("mongoose");

const CommentaireSchema = new mongoose.Schema(
  {
    PostId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,

    },
    body: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
   
    parentId: {
      type: String,

    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commentaire", CommentaireSchema);
