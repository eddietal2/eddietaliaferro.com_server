const express = require("express");
const router  = express.Router();
var blogController = require('../controller/blog-controller')

router.get('/get-blog-posts', blogController.getBlogPosts)
router.post('/get-blog-info', blogController.getBlogInfo)
router.get('/get-latest-blog-posts', blogController.getLatestBlogPosts)
router.post('/add-blog', blogController.addBlog)
router.post('/toggle-visibility', blogController.toggleVisibility)
router.post('/delete-blog', blogController.deleteBlog)
router.post('/edit-blog', blogController.editBlog)
router.post('/add-comment', blogController.addComment)
router.post('/delete-comment', blogController.deleteComment)
router.post('/edit-comment', blogController.editComment)
router.post('/add-reply', blogController.addReply)
router.post('/delete-reply', blogController.deleteReply)
router.post('/edit-reply', blogController.editReply)


module.exports = router;