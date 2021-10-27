const User = require('../models/user.model');
const Comment = require('../models/blog.model');
const Reply = require('../models/blog.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const config = require('../config/default.json');

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email, fullName: user.fullName, picture: user.picture }, config.jwtSecret, {
      expiresIn: 200 // 86400 expires in 24 hours
    });
}
exports.registerAdmin = (req, res) => {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;
  let fullName = req.body.fullName;
  let picture = req.body.picture;
  let isAdmin = true;
  if (!req.body.email || !req.body.password) {
      return res.status(400).json({ 'msg': 'You need to send email and password' });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
          return res.status(400).json({ 'msg': err });
      }

      if (user) {
          return res.status(400).json({ 'msg': 'The user already exists' });
      }

      let newUser = User({
        email,
        password,
        fullName,
        picture,
        isAdmin
      });
      newUser.save((err, user) => {
          if (err) {
              return res.status(400).json({ 'msg': err });
          }
          return res.status(200).json(user);
      });
  });
};
exports.loginAdmin = (req, res) => {
  console.log('Attempting to log in as Admin...');
  let email = req.body.email;
  let password = req.body.password;
  console.log(password)
  if (!req.body.email || !req.body.password) {
      return res.status(400).send({ 'msg': 'You need to send email and password' });
  }
  if(email !== 'eddielacrosse2@gmail.com') {
    console.log('Whaddup doe!');
    return res.status(400).json({msg: 'This user is not the admin! This person is not Eddie!!!!!!'})
  }

  User.findOne({ email: req.body.email },
    (err, user) => {
        console.log('Loggin in:')
        console.log(user);
      if (err) {
          return res.status(400).send({ 'msg': err });
      }

      if (!user) {
          return res.status(400).json({ 'msg': 'The user does not exist' });
      }

      user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
              console.log('Logged in as: ' + user.email);
              res.status(200).json({
                msg: 'Admin @' + user.email + ' has logged in',
                token: createToken(user),
                fullName: user.fullName,
                picture: user.picture,
                email: user.email
              });
          } else {
              return res.status(400).json({ msg: 'The email and password don\'t match.' });
          }
      });
  });
};
exports.registerUser = (req, res) => {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    let fullName = req.body.fullName;
    let picture = req.body.picture;
    let isAdmin = false;
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }

        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }

        let newUser = User({
          email,
          password,
          fullName,
          picture,
          isAdmin
        });
        newUser.save((err, user) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ 'msg': err });
            }
            if (!user) {
                console.log('There was no user saved!')
                return res.status(400).json({ msg: 'There was no user saved!' });
            }
            console.log('User registered!');
            return res.status(200).json(user);
        });
    });
};
exports.loginUser = (req, res) => {
    console.log('Attempting to log in...')
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
  
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
  
        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }
  
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                console.log('Logged in as: ' + user.email);
                res.status(200).json({
                    msg: 'User @' + user.email + ' has logged in',
                    token: createToken(user),
                    fullName: user.fullName,
                    picture: user.picture,
                    email: user.email
                });
            } else {
                return res.status(400).json({ msg: 'The email and password don\'t match.' });
            }
        });
    });
};
exports.forgotPasswordCode = (req, res) => {
    // Get user email
    // Get user password
    // change password
    return res.status(200).json({
        msg: 'Sending Code to Email'
    })
}
exports.forgotPasswordUser = (req, res) => {
    // Get user email
    // Send Code
    return res.status(200).json({
        msg: 'User has changed forgotten password'
    })
}
exports.changePasswordUser = (req, res) => {
    console.log('request');
    console.log(req.body);

    if ( !req.body.oldPassword || !req.body.newPassword) {
      res.status(400).send('Please enter an old password and a new password')
    }

    else if (req.body.oldPassword === req.body.newPassword) {
      console.log('New Password is the same as old password');
      res.status(400).send('Please enter a password that is different than your old password');
    }
      else {

      console.log('Changing passsword..');
      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
          return res.status(400).json({ 'msg': err });
        } else {
          console.log(user);

          user.comparePassword(req.body.oldPassword, (err, isMatch) => {

            if (isMatch & !err) {

              // Create new hashed password
              bcrypt.genSalt(10, (err, salt) => {

                if (err) return next(err);

                bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                  console.log('New Password Hashed: ' + hash);
                  let newPassword = hash;
                  let filter = { password: user.password };
                  let update = { password: newPassword }

                  User.updateOne(filter, update)
                    .then( data => {
                      console.log('Updated Password: ' + JSON.stringify(data));
                      res.status(200).send(true);
                    })
                    .catch( err => {
                      console.log(err);
                      res.status(400).end('There was an error');
                    })
                  })
                })
            } else {
              console.log(isMatch);
              return res.status(200).send(false);
            }
          })
        }
      })
    }
  }
exports.updateUserProfile = (req, res) => {
    console.log(req.body)
    let fullName = req.body.fullName;
    let oldEmail = req.body.oldEmail;
    let newEmail = req.body.newEmail;
    let picture = req.body.picture;
    let password = req.body.password;

    // Change details in User Profile
    let update = {
      fullName,
      email: newEmail,
      picture,
    }
    User.findOne(
      {email: req.body.oldEmail},
      (err, user) => {
        if (err) {
          console.log(err);
          return res.status(400).json({msg: 'there was an err', err})

        }
        if (!user) {
          console.log('There was no user with that email')
          return res.status(400).json({msg: 'there was no user with that email'})
        }
        if(user) {
          user.comparePassword(password, (err, isMatch) => {
            if (isMatch && !err) {
              console.log('Passwords matched!');

              User.updateOne({email: oldEmail}, update)
              .then( data => {
                console.log('Updated About:' + JSON.stringify(data));
              })
              .catch( err => {
                console.log(err);
                return res.status(400).send('There was an error updating User');
              })
              return res.status(200).json({
                isMatch,
                msg: 'Passwords Matched. User profile has been updated.',
                picture,
                fullName,
                newEmail
            });
            }
            else {
              console.log('Wrong Password');
              return res.status(400).json({ msg: 'Wrong Password' });
            }
          })
        }
      }
    )

    // Change Details in Blog's Comments & Replies
    Blog.find((err, blogs) => {
      if(err) {
        console.clear()
        console.log(err)
        return res.status(400).json({
          msg: 'There was an err with retrieved all blogs',
          err
        })
      }
      if(!blogs) {
        console.clear()
        console.log('There was no blogs retrieved from database!')
        return res.status(400).json({
          msg: 'There was no blogs retrieved from database!',
        })
      }
      if(blogs) {
        console.clear()
        console.log('Found Blogs');

        // Change User Details in Comments & Replies
        for(i=0; i < blogs.length; i++) {
          // Update Comments --> Update Replies in Scope
          blogs[i].comments.forEach(comment => {
            console.log(comment.email);
            if(oldEmail === comment.email) {
              comment.name = fullName;
              comment.picture = picture;
              comment.email = newEmail;
            }
            // Update Replies
            comment.replies.forEach(reply => {
              console.log('Comment Reply');
              console.log(reply.email)
              if(oldEmail === reply.email) {
                reply.fullName = fullName;
                reply.picture = picture;
                reply.email = newEmail;
              }
            })
          });
          // Update Blogs
          Blog.updateOne(
            {_id: blogs[i]._id},
            blogs[i],
            {new: true},
            (err, blog) => {
              if(err) {
                console.clear();
                console.log(err);
                return res.status(400).json(err);
              }
              if(!blog) {
                console.clear();
                console.log('There were no blogs');
                return res.status(400).json({msg: 'There were no blogs'});
              }
              if(blog) {
                console.clear();
                console.log('Updated Blogs');
                console.log(blog);
                // return res.status(200).json(blog);
              }
          })
        }
      }
    });
}
exports.checkIfEmailExists = (req, res) => {
    let email = req.body.email;
    User.findOne(
        {email: email},
        (err, user) => {
          console.clear()
          console.log(req.body);
          console.log('This is the user: ')
          console.log(user)
            if(err) {
                console.log(err);
                return res.status(400).json({
                    msg: 'There was an error finding User.',
                    err
                })
            }
            if(!user) {
                console.log('There was no user with that email');
                return res.status(200).json({
                    msg: 'There was no User with that email.',
                    isEmail: false
                })
            }
            if(user) {
                console.log('There was a user with that email');
                return res.status(200).json({
                    msg: 'There was a user with that email',
                    isEmail: true
                })
            }
        }
    )
}
exports.sendCode = (req, res) => {
  console.clear();
  console.log(req.body);
  let code = req.body.code;
  let email = req.body.email;
  // Set transport service which will send the emails
  var transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
          user: 'eddielacrosse2@gmail.com',
          pass: 'taliaferro2',
      },
      debug: true, // show debug output
      logger: true // log information in console
  });

//  configuration for email details
 const mailOptions = {
  from: 'eddielacrosse2@gmail.com', // sender address
  to: `${email}`, // list of receivers
  subject: 'EddieTaliaferro.com Registration Code',
  html:
  `
    <img
      style="width: 100px; margin: 35px 0 20px"
      src="https://eddietaliaferro-com.s3.us-east-2.amazonaws.com/logos-and-default-profile-picture/002001635260539420_picture.png" />
    <h3 style="
      font-size: 1.4em;
      color: #333;
    ">Here is your 6 digit code:</h3>
    <p style="
      background: #1d071f;
      border-radius: 100px;
      border: 2px solid #3cf63c;
      width: 200px;
      color: #d8cca8;
      padding: 0.5em;
      text-align: center;
      font-size: 2em;
      letter-spacing: 11px;">${code}</p>`,
  };

 transporter.sendMail(mailOptions, function (err, info) {
  if(err) {
    console.log(err)
    return res.status(400).json(err);
  }
  else {
    console.log(info);
    return res.status(200).json(info)
  }
 });
}
