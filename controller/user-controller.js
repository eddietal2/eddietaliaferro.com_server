const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: 200 // 86400 expires in 24 hours
    });
}
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
              return res.status(400).json({ 'msg': err });
          }
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
              });
          } else {
              return res.status(400).json({ msg: 'The email and password don\'t match.' });
          }
      });
  });
};
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
              });
          } else {
              return res.status(400).json({ msg: 'The email and password don\'t match.' });
          }
      });
  });
};