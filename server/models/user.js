
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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


module.exports = {User}
