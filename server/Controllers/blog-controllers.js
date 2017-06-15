const Blogs = require('../Models/blog')

function createBlog (req,res){
  Blogs.create({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    creator: req.body.creator,
    user_id: req.body.user_id
  },function(err,result){
    res.send(result)
  })
}

function updateBlog (req,res){
  Blogs.findOne({
    _id: req.params.id
  },function(err,result){
    Blogs.updateOne({
      _id: req.params.id
    },{
      title: req.body.title || result.title,
      content: req.body.content || result.content,
      category: req.body.category || result.category
    },function(err,result){
      res.send(`update sukses!`)
    })
  })
}

function deleteBlog (req,res){
  Blogs.remove({
    _id: req.params.id
  },function(err,result){
    res.send(`Delete Blog Success!`)
  })
}

function getUserBlogs (req,res){
  Blogs.find({
    user_id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function getOneBlog (req,res){
  Blogs.findOne({
    _id: req.params.id
  },function(err,result){
    res.send(result)
  })
}

function listBlogs (req,res){
  Blogs.find({},function(err,result){
    res.send(result)
  })
}

function categoryBlog(req,res){
  Blogs.find({
    category: req.params.category
  },function(err,result){
    res.send(result)
  })
}

function authorBlog(req,res){
  Blogs.find({
    creator: req.params.creator
  },function(err,result){
    res.send(result)
  })
}

module.exports = {
  listBlogs,getOneBlog,getUserBlogs,deleteBlog,updateBlog,createBlog,categoryBlog,authorBlog
}