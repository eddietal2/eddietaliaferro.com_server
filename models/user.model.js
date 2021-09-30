const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      maxlength: 50
    },
    picture: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    email: {
      type: String,
      maxlength: 50
    },
    password: {
      type: String,
      minlength: 6
    },
})

// Called before save method on the model
// Turns user entered password into a hash value, with salt
UserSchema.pre('save', function(next){
  // had to use a regular function ^ to get the correct scope of 'this'.
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      if(hash) {
        user.password = hash;
        this.password = user.password;
        console.log('Password Hashed');
        console.log(user.password);
        return next();
      }
    })
  })
  })

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    // console.log('Password: ' + candidatePassword);
    // console.log('Hashed Password: ' + this.password);
    // console.log('Passwords Match: ' + isMatch);
    if (err) return cb(err);
    cb(null, isMatch);
  })
}


//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
  return token;
}

// exports.validate = validateUser;

const User = mongoose.model('User', UserSchema);
module.exports = User;