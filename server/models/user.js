
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
var UserSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    //2 documents cant be the same within the document
    unique: true,
    //use validate library to ensure email is valid
    validate: {
      validator: //(value)=> {
        //  return validator.isEmail(value);
        validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
    },
    password:{
      type: String,
      require: true,
      minlength: 6
    },
    //tokens is an array that is not available in SQL databases like posgress
    tokens: [{
      access: {
        type:String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
});


UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject= user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};
//instance methods for Schema

//arrow functions do not bind this keyword
UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

//returns promise so we can call .then
  return user.save().then(() => {
    return token;
  });
};
//make a user model like name, age, password the only thing we set up here is email
//require it - trim it -set type -set min length of 1

// {
//   email: 'victobiz@yahoo.com',
//   //never store your pwd in plaintext
//   password: 'myPass123'
//   tokens:[{
//     //you could have other things here like email and setting up passwords
//     access: 'auth'
//     //string that is passed back and forth
//     token: 'dkdkadkfj'
//   }]
// }

//statics method turns everything into a model as opposed to an instance method
UserSchema.statics.findByToken = function (token) {

  //instance methods get called with the individual document. model methods get called with the model as the .this binding user/User
  var User = this;
  var decoded;

  //jwt.verify() throws an error if anything goes wrong so we use a try catch block

  try{
    decoded =jwt.verify(token, 'abc123');
  }catch(e) {
    // return new Promise((resolve, reject) => {
    //
    // });
    return Promise.reject();
  }
  //if we are able to verify then return the following promise...

  return User.findOne({
    //need to return nested object properties
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'

  });
};

UserSchema.statics.findByCredentials = function (email, password){
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user) {
      return Promise.reject();
    }
//bcrypt only supports callbacks not promises
    //bcrypt.compare doesnt worky

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res)=> {
        if(res){
          resolve(user);
        }else {
          reject();
        }
      });
    });
  });
};

UserSchema.methods.removeToken = function (token) {
  //mongodb operator
  var user = this;

//if the token matches something it will be removed (the entire object not just the )
  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};
//before every save in mongo db check to see if the user password is modified
UserSchema.pre('save', function (next) {
  var user = this;

//return true if password is modified
if ( user.isModified('password')){
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(user.password, salt, (err, hash) => {
    user.password = hash;
    next();
  });
});

}else {
  next();
}
});



var User =mongoose.model('User', UserSchema);

// var newUser = new user({
//   name: 'Chris',
//   email: '          www.victobiz'
// });
//
// newUser.save().then((doc)=>{
//   console.log(doc);
// }, (e) => {
//   console.log('no worky');
// });


module.exports = {User};
