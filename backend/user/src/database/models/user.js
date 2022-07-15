const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
  
      },
      CIN: {
        type: Number,
        require: true,
        
        unique: true,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 6,
      },
      profilePicture: {
        type: String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
      coverPicture: {
        type: String,
        default: "",
      },
      followers: {
        type: Array,
        default: [],
      },
      followings: {
        type: Array,
        default: [],
      },
      likes: {
        type: Array,
        default: [],
      },
      role: {
        type: String,
        default: 'visiteur',
        enum: ["visiteur","Étudiant", "Enseignant", "administrateur"]
       },
      desc: {
        type: String,
        max: 50,
      },
      city: {
        type: String,
        max: 50,
      },
      numero:Number,
      salt: String
    },
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

module.exports =  mongoose.model('user', userSchema);