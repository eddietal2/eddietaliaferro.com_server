const Blog = require('../models/blog.model');
exports.getBlogPosts = (req, res) => {
  Blog.find((err, blogs) => {
    // console.log(blogs)
    console.log('Getting Blogs...')
    res.json(blogs)
  })
}
exports.getBlogInfo = (req, res) => {
  const id = req.body.id;
  console.log(req.body);
  Blog.findById(
    id,
    (err, blog) => {
      console.log(blog)
      console.log('Getting Blogs...')
      if(err) return res.status(400).json(err)
      if(!blog) return res.status(400).json({msg: 'There was no blog with that id'})
      console.log(`Deleting _id ${id}`);
      return res.status(200).json(blog)
  })
}
exports.getLatestBlogPosts = (req, res) => {
  Blog.find((err, blogs) => {
    // console.log(blogs)
    // Get the last three blogs to be put in the blogs collection
    console.log('Getting Latests Blogs...')
    console.log(blogs.slice(0, 2))
    res.json(blogs.slice(0, 3))
  })
}
exports.toggleVisibility = (req, res) => {
  id = req.body.id;
  title = req.body.title;
  visible = req.body.visible;
  console.log('Blog "' + title + '" visibility:')
  Blog.findById(
    id,
    (err, blog) => {
    if(err) {
      console.log(err);
      return err;
    }
    if(!blog) {
      console.log('There was no Blog with that ID!');
      return res.status(400).json({msg: 'There was no Blog with that ID'});
    }
    if(blog) {
      // check for visibility property
      // toggle the property
      if(!blog.visible) {
        Blog.findByIdAndUpdate(
          id,
          {visible: true},
          {new: true},
          (err, blog) => {
            if(err) {
              console.log(err);
              return err;
            }
            if(!blog) {
              console.log('There was no Blog with that ID!');
              return res.status(400).json({msg: 'There was no Blog with that ID'});
            }
            if(blog) {
              console.log(blog.visible);
              console.log('\n');
              return res.status(200).json(visible);
            }
          }
        )
      }
      if(blog.visible) {
        Blog.findByIdAndUpdate(
          id,
          {visible: false},
          {new: true},
          (err, blog) => {
            if(err) {
              console.log(err);
              return err;
            }
            if(!blog) {
              console.log('There was no Blog with that ID!');
              return res.status(400).json({msg: 'There was no Blog with that ID'});
            }
            if(blog) {
              console.log(blog.visible);
              console.log('\n');
              return res.status(200).json(visible);
            }

          }
        )
      }
    }
  });
}
exports.addBlog = (req, res) => {
  console.log(req.body);
  title = req.body.title;
  visible = req.body.visible;
  thumbnail = req.body.thumbnail;
  hashtags = req.body.hashtags.map(tag => ' #' + tag);
  post = req.body.post;
  picture_1 = req.body.picture_1;
  picture_2 = req.body.picture_2;
  picture_3 = req.body.picture_3;
  picture_4 = req.body.picture_4;
  picture_5 = req.body.picture_5;

  if(!title) return res.status(400).json({msg: 'There was either no title in the request'})
  if(!thumbnail) return res.status(400).json({msg: 'There was no thumbnail in the request'})
  if(!post) return res.status(400).json({msg: 'There was either no post in the request'})
  // picture = req.body.picture;

  // made a new Blog object and save it

  let newBlog = Blog({
    title,
    post,
    visible,
    hashtags,
    thumbnail,
    picture_1,
    picture_2,
    picture_3,
    picture_4,
    picture_5,
    date: Date.now()
  })

   newBlog.save((err, blog) => {
    if(err) return res.status(400).json(err);
    console.log(err);
    if(!blog) {
      return res.status(400).json({msg: 'There was no blog with that ID, the Blog did not save.'})
    }
    if(blog) {
      return res.status(200).json(blog)
    }
  })
}
exports.deleteBlog = (req, res) => {
  // blog id
  blogID = req.body.id;
  console.log(req.body);
  console.log(blogID)
  Blog.findByIdAndDelete(
    blogID,
    (err, blog) => {
      if(err) return res.status(400).json(err)
      if(!blog) return res.status(400).json({msg: 'There was no blog with that id'})
      console.log(`Deleting _id ${blogID}`);

      Blog.find((err, blogs) => {
        // console.log(blogs)
        console.log('Getting Blogs...')
        return res.status(200).json(blogs);
      })
    }
  )
}
exports.editBlog = (req, res) => {
  console.log(req.body);
  id = req.body.id;
  title = req.body.title;
  visible = req.body.visible;
  thumbnail = req.body.thumbnail;
  hashtags = req.body.hashtags.map(tag => ' #' + tag);
  post = req.body.post;
  picture_1 = req.body.picture_1;
  picture_2 = req.body.picture_2;
  picture_3 = req.body.picture_3;
  picture_4 = req.body.picture_4;
  picture_5 = req.body.picture_5;

  Blog.findOneAndUpdate(
    id,
    { $set:
      { 'title': title,
        'thumbnail': thumbnail,
        'hashtags': hashtags,
        'post': post,
        'picture_1': picture_1,
        'picture_2': picture_2,
        'picture_3': picture_3,
        'picture_4': picture_4,
        'picture_5': picture_5,
      }
    },
    { new: true },
    (err, blog) => {
      if(err) return res.status(400).json(err)
      if(!blog) return res.status(400).json({msg: 'There was no blog with that id'})
      console.log(`Editing _id ${id}`)
      if(blog) {
        return res.status(200).json({msg: `Edited blog with _id ${id}`, blog})
      }
    }
  )
}
exports.addComment = (req, res) => {
  // blogId
  // user email
  const date = Date.now()
  const blogId = req.body.id;
  const email = 'eddielacrosse2@gmail.com';
  const name = 'Eddie Taliaferro';
  const comment = 'This is a comment.';
  // const email = req.body.email;
  // const name = req.body.name;
  // const comment = req.body.comment;

  let newComment = {
    date,
    blogId,
    email,
    name,
    comment
  }

  console.log(newComment)

  Blog.findByIdAndUpdate(
    {_id: blogId},
    {$push: {comments: newComment
    }},
    {new: true},
    (err, blog) => {
      if(err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if(!blog) return res.status(400).json({msg: 'There was no blog with that id.'})
      if(blog) {
        return res.status(200).json({msg: `Comment has been added by ${name} on blog titled '${blog.title}'`})
      }
    }
  )
}
exports.deleteComment = (req, res) => {
  blogId = req.body.blogID;
  commentId = req.body.commentID;
  const email = 'eddielacrosse2@gmail.com';
  const name = 'Eddie Taliaferro';
  const reply = 'This is a reply.';
  // email = req.body.email;
  // name = req.body.name;

  if(!blogID) return res.status(400).json({msg: 'there was no blogId in the request'})
  if(!commentID) return res.status(400).json({msg: 'there was no _id in the request'})
  if(!email) return res.status(400).json({msg: 'there was no email in the request'})

  Blog.findByIdAndUpdate(
    blogId,
    {$pull: {comments: {_id: commentId}}},
    {new: true},
    (err, blog) => {
      if(err) return res.status(400).json(err)
      if(!blog) return res.status(400).json({msg: 'there was no blogId in the request'})
      if(blog) {
        console.log('Comment is being deleted')
        return res.status(400).json({msg: `Comment is being deleted by ${name} on blog '${blog.title}'`})
      }
    }
  )

}
exports.editComment = (req, res) => {
  commentId = req.body._id;
  blogId = req.body.blogId;
  name = req.body.name;
  email = req.body.email;
  newComment = req.body.newComment;

  if(!commentId) return res.status(400).json({msg: "no commentId in request"})
  if(!blogId) return res.status(400).json({msg: "no blog _id in request"})
  if(!name) return res.status(400).json({msg: "no name in request"})
  if(!email) return res.status(400).json({msg: "no email in request"})
  if(!newComment) return res.status(400).json({msg: "no newComment in request"})

  Blog.findOneAndUpdate(
    {_id: blogId, 'comments._id': commentId},
    { $set: {'comments.$.comment': newComment} },
    { new: true },
    (err, blog) => {
      if(err) return res.status(400).json(err)
      if(!blog) return res.status(400).json({msg: 'There was no blog with that id'})
      console.log(`Editing comment ${commentId}`)
      return res.status(400).json({msg: `Edited comment in blog ${blog.title} with _id ${commentId}`, blog})
    }
  )
}
exports.addReply = (req, res) => {
  // blogId
  // user email
  const date = Date.now()
  const blogID = req.body.blogID;
  const commentID = req.body.commentID;
  const email = 'eddielacrosse2@gmail.com';
  const name = 'Eddie Taliaferro';
  const reply = 'This is a reply.';
  // const email = req.body.email;
  // const name = req.body.name;
  // const comment = req.body.comment;

  let newReply = {
    date,
    email,
    name,
    reply
  }

   Blog.findById(
     blogID,
     (err, blog) => {
      if(err) {
        console.log(err);
        return res.status(400).json({
          message: 'There was a an error finding the post id',
        err})
      }
      if(!blog) {
        console.log('There was no Blog with that ID')
        return res.status(400).json({
          message: 'There was no blog with that id'})
      }
      if(blog) {
        console.log(newReply)
        let comments = blog.comments;

        commentSearch(commentID, comments);

        function commentSearch(commentID, commentsArray){
          for (let i=0; i < commentsArray.length; i++) {
                if (commentsArray[i]._id == commentID) {
                  console.log('Attempting to Add Reply to Comment..');

                  Blog.findOneAndUpdate(
                    { _id: blogID, 'comments._id': commentID },
                    { $push: {'comments.$.replies': newReply }},
                    { new: true },
                    (err, blog) => {

                     if ( err ) {
                      console.log(err);
                      return res.status(400).send(err);
                     }
                     if ( !blog ) return res.status(400).json({ message: 'there were no blogs with this ID' });
                     if (blog) {
                        // for (comment of post['comments']) {
                        //   console.log('Replies for this comment:\n', comment['replies'])
                        // }
                        return res.status(200).json({
                        message: 'Reply has been added',
                        // post: postID,
                        // comment: commentID,
                        // userEmail: post.comments[i].userEmail,
                        // userFullName: userFullName,
                        // userProfilePicture: userProfilePicture,
                        // comments: post.comments,
                        // replies: post.comments[i].replies,
                        // newReply: newReply._id
                     });
                   }

                  })
                }
          }

        }
      }

     }
   )

  
}
exports.deleteReply = (req, res) => {
  blogId = req.body.blogID;
  commentId = req.body.commentID;
  const email = 'eddielacrosse2@gmail.com';
  const name = 'Eddie Taliaferro';
  const reply = 'This is a reply.';
  // email = req.body.email;
  // name = req.body.name;

  if(!blogID) return res.status(400).json({msg: 'there was no blogId in the request'})
  if(!commentID) return res.status(400).json({msg: 'there was no _id in the request'})
  if(!email) return res.status(400).json({msg: 'there was no email in the request'})

  Blog.findByIdAndUpdate(
    blogId,
    {$pull: {comments: {_id: commentId}}},
    {new: true},
    (err, blog) => {
      if(err) return res.status(400).json(err)
      if(!blog) return res.status(400).json({msg: 'there was no blogId in the request'})
      if(blog) {
        console.log('Comment is being deleted')
        return res.status(400).json({msg: `Comment is being deleted by ${name} on blog '${blog.title}'`})
      }
    }
  )

}
exports.editReply = (req, res) => {
  commentId = req.body._id;
  blogId = req.body.blogId;
  fullName = req.body.name;
  email = req.body.email;
  newComment = req.body.newComment;

  if(!commentId) return res.status(400).json({msg: "no commentId in request"})
  if(!blogId) return res.status(400).json({msg: "no blog _id in request"})
  if(!fullName) return res.status(400).json({msg: "no name in request"})
  if(!email) return res.status(400).json({msg: "no email in request"})
  if(!newComment) return res.status(400).json({msg: "no newComment in request"})

  Blog.findOneAndUpdate(
    {_id: blogId, 'comments._id': commentId},
    { $set: {'comments.$.comment': newComment} },
    { new: true },
    (err, blog) => {
      if(err) return res.status(400).json(err)
      if(!blog) return res.status(400).json({msg: 'There was no blog with that id'})
      console.log(`Editing comment ${commentId}`)
      return res.status(400).json({msg: `Edited comment in blog ${blog.title} with _id ${commentId}`, blog})
    }
  )
}