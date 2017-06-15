var express = require('express');
var router = express.Router();
const Users = require('../Controllers/user-controllers.js')
const Blogs = require('../Controllers/blog-controllers.js')


router.post('/user/signup',Users.signup)
router.post('/user/login',Users.login)
router.get('/user/list',Users.listUsers)

router.get('/list',Blogs.listBlogs)
router.get('/blog/:id',Blogs.getOneBlog)
router.get('/user/:id',Blogs.getUserBlogs)
router.post('/createBlog',Blogs.createBlog)
router.put('/updateBlog',Blogs.updateBlog)
router.delete('/:id',Blogs.deleteBlog)
router.get('/blog/:category',Blogs.categoryBlog)
router.get('/blog/creator/:creator',Blogs.authorBlog)

module.exports = router;
