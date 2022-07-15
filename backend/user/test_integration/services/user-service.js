const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

  username: String,
  CIN:Number,
  email: String,
  desc: String,
  numero:Number,
  password: String,
})

const User = mongoose.model('users', userSchema)

module.exports.store = async ({ username,
  CIN,
  email,
  desc,
  numero,
  password }) => {
  const user = new User({
    username,
    CIN,
    email,
    desc,
    numero,
    password,
  })
  await user.save()
  return user
}
