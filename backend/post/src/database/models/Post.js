const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postschema = new Schema(
  {
    userId: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
      Commentaires: {
        type: Array,
        default: [],
      },  
     } ,
      {
      toJSON: {
          transform(doc, ret){
              delete ret.password;
              delete ret.salt;
  
              delete ret.__v;
          }
      },
      timestamps: true
});

module.exports =  mongoose.model('post', postschema);