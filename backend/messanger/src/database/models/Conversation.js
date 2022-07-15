const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
  
    members: {
      type: Array,
      default: [],
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", PostSchema);
