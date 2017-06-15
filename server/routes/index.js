var express = require('express');
var router = express.Router();
const Users = require('../Controllers/user-controllers')
const Blogs = require('../Controllers/blog-controllers')

/* GET home page. */
router.post('/users/signup',Users.signup)
router.post('/users/login',Users.login)

router.get('/list',Blogs.listBlogs)
router.get('/:id',Blogs.getOneBlog)
router.get('/user/:id',Blogs.getUserBlogs)
router.post('/createBlog',Blogs.createBlog)
router.put('/updateBlog',Blogs.updateBlog)
router.delete('/:id',Blogs.deleteBlog)

module.exports = router;
