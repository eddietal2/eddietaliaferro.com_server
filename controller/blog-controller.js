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
  code_1 = req.body.code_1;
  code_2 = req.body.code_2;
  code_3 = req.body.code_3;
  code_4 = req.body.code_4;
  code_5 = req.body.code_5;
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
    code_1,
    code_2,
    code_3,
    code_4,
    code_5,
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
  console.clear();
  console.log(req.body);
  id = req.body.id;
  title = req.body.title;
  visible = req.body.visible;
  thumbnail = req.body.thumbnail;
  hashtags = req.body.hashtags.map(tag => ' #' + tag);
  post = req.body.post;
  code_1 = req.body.code_1;
  code_2 = req.body.code_2;
  code_3 = req.body.code_3;
  code_4 = req.body.code_4;
  code_5 = req.body.code_5;
  picture_1 = req.body.picture_1;
  picture_2 = req.body.picture_2;
  picture_3 = req.body.picture_3;
  picture_4 = req.body.picture_4;
  picture_5 = req.body.picture_5;

  Blog.findOneAndUpdate(
    {_id: id},
    { $set:
      { 'title': title,
        'thumbnail': thumbnail,
        'hashtags': hashtags,
        'post': post,
        'code_1': code_1,
        'code_2': code_2,
        'code_3': code_3,
        'code_4': code_4,
        'code_5': code_5,
        'picture_1': picture_1,
        'picture_2': picture_2,
        'picture_3': picture_3,
        'picture_4': picture_4,
        'picture_5': picture_5,
      }
    },
    { new: true },
    (err, blog) => {
      if(err) {
        console.log(err);
        return res.status(400).json(err)
      }
      if(!blog) return res.status(400).json({msg: 'There was no blog with that id'})
      console.log(`Editing _id ${id}`)
      if(blog) {
        return res.status(200).json({msg: `Edited blog with _id ${id}`, blog})
      }
    }
  )
}
exports.addComment = (req, res) => {
   console.log(req.body);
   let date = Date.now()
   let blogId = req.body.id;
   let email = req.body.userEmail;
   let name = req.body.name;
   let picture = req.body.picture;
   let comment = req.body.comment;

  let newComment = {
    date,
    blogId,
    email,
    name,
    picture,
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
        return res.status(200).json({msg: `Comment has been added by ${name} on blog titled '${blog.title}'`,
        comments: blog.comments})
      }
    }
  )
}
exports.deleteComment = (req, res) => {
  console.log(req.body);
  blogID = req.body.blogID;
  commentID = req.body.commentID;
  title = req.body.title;
  userFullName = req.body.userFullName;

  if(!blogID) return res.status(400).json({msg: 'there was no blogID in the request'})
  if(!commentID) return res.status(400).json({msg: 'there was no _id in the request'})

  Blog.findByIdAndUpdate(
    blogID,
    {$pull: {comments: {_id: commentID}}},
    {new: true},
    (err, blog) => {
      if(err) return res.status(400).json(err)
      if(!blog) return res.status(400).json({msg: 'there was no blogId in the request'})
      if(blog) {
        console.log('Comment is being deleted')
        return res.status(200).json({msg: `Comment is being deleted by ${userFullName} on blog '${blog.title}'`,
        comments: blog.comments})
      }
    }
  )

}
exports.editComment = (req, res) => {
  commentID = req.body.commentID;
  blogID = req.body.blogID;
  comment = req.body.comment;

  if(!commentID) return res.status(400).json({msg: "no commentID in request"})
  if(!blogID) return res.status(400).json({msg: "no blogID in request"})
  if(!comment) return res.status(400).json({msg: "no updated comment in request"})

  Blog.findOneAndUpdate(
    {_id: blogID, 'comments._id': commentID},
    { $set: {'comments.$.comment': comment} },
    { new: true },
    (err, blog) => {
      if(err) return res.status(400).json(err)
      if(!blog) return res.status(400).json({msg: 'There was no blog with that id'})
      console.log(`Editing comment ${commentID}`)
      return res.status(200).json({msg: `Edited comment in blog ${blog.title} with _id ${commentID}`, blog})
    }
  )
}
exports.addReply = (req, res) => {
  const date = Date.now()
  const blogID = req.body.blogID;
  const commentID = req.body.commentID;
  const email = req.body.email;
  const fullName = req.body.fullName;
  const picture = req.body.picture;
  const reply = req.body.reply;

  let newReply = {
    blogID,
    commentID,
    date,
    email,
    reply,
    fullName,
    picture
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
                        for (let i = 0; i < blog.comments.length; i++) {
                          if(blog.comments[i]._id == commentID) {
                            return res.status(200).json({
                              message: 'Reply has been added',
                              replies: blog.comments[i].replies
                              });
                          }
                        }
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
  console.log(req.body)
  blogID = req.body.blogID;
  commentID = req.body.commentID;
  replyID = req.body.replyID;

  if(!blogID) return res.status(400).json({msg: 'there was no blogId in the request'})
  if(!commentID) return res.status(400).json({msg: 'there was no _id in the request'})
  if(!replyID) return res.status(400).json({msg: 'there was no replyID in the request'})

  Blog.findByIdAndUpdate(
    { _id: blogID, 'comments._id': commentID },
    { $pull: {'comments.$[].replies': {'_id': replyID} }},
    {new: true},
    (err, blog) => {
      if(err) {
        console.log(err);
        return res.status(400).json(err);
      }
      if(!blog) return res.status(400).json({msg: 'there was no blogID in the request'})
      if(blog) {
        console.log('Reply is being deleted')
        console.log(blog.comments);
        for (let i = 0; i < blog.comments.length; i++) {
          if(blog.comments[i].id === commentID) {
            return res.status(200).json({
              msg: `Reply is being deleted on blog '${blog.title}'`,
              replies: blog.comments[i].replies,
          })

          }
        }
        
      }
    }
  )

}
exports.editReply = (req, res) => {
  commentID = req.body.commentID;
  blogID = req.body.blogID;
  replyID = req.body.replyID;
  reply = req.body.reply;

  if(!commentID) return res.status(400).json({msg: "no commentID in request"})
  if(!blogID) return res.status(400).json({msg: "no blogID in request"})
  if(!replyID) return res.status(400).json({msg: "no replyID in request"})
  if(!reply) return res.status(400).json({msg: "no reply in request"})

  Blog.findOneAndUpdate(
    {_id: blogID, 'comments.replies._id': replyID},
    { $set: {'comments.$[].replies.$.reply': reply}},
    { new: true },
    (err, blog) => {
      if(err) {
        console.log(err)
        return res.status(400).json(err)
      }
      if(!blog) return res.status(400).json({msg: 'There was no blog with that id'})
      console.log(`Editing comment ${commentID}`)
      return res.status(200).json({msg: `Edited comment in blog ${blog.title} with _id ${commentID}`, blog})
    }
  )
}