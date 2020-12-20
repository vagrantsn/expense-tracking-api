const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    index: {
      unique: true,
    },
  },
  password: String,
})

const User = mongoose.model('User', userSchema)

module.exports = User
