const mongoose = require('mongoose')
const Schema = mongoose.Schema

var blogSchema = new Schema({
  title: String,
  content: String,
  category: String,
  creator: String,
  user_id: {type:Schema.Types.ObjectId,ref:'User'}
})

var Blog = mongoose.model('Blogs',blogSchema)

module.exports = Blog