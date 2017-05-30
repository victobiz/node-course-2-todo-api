
var mongoose = require('mongoose');

//make a user model like name, age, password the only thing we set up here is email
//require it - trim it -set type -set min length of 1


var user =mongoose.model('User', {
  name:{
    name: String
  },
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

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


module.exports = {user};
