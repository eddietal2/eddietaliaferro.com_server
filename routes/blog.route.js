const express = require("express");
const router  = express.Router();
var blogController = require('../controller/blog-controller')

router.get('/', (req, res) => {
  res.send('This is working.')
})

router.get('/get-blog-posts', blogController.getBlogPosts)
router.post('/get-blog-info', blogController.getBlogInfo)
router.get('/get-latest-blog-posts', blogController.getLatestBlogPosts)
router.post('/add-blog', blogController.addBlog)
router.post('/toggle-visibility', blogController.toggleVisibility)
router.post('/delete-blog', blogController.deleteBlog)
router.post('/edit-blog', blogController.editBlog)
router.post('/add-comment', blogController.addComment)
router.delete('/delete-comment', blogController.deleteComment)
router.put('/edit-comment', blogController.editComment)
router.post('/add-reply', blogController.addReply)
router.delete('/delete-reply', blogController.deleteReply)
router.put('/edit-reply', blogController.editReply)


module.exports = router;