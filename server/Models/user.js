const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String
})

var User = mongoose.model('User',userSchema)

module.exports = User