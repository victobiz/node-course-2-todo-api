//this version goes over how to create default models this is good for instance if a newTodo instance is created
//but no content is added, thus some default properties will populate the instance instead of leaving it blank.

var mongoose = require('mongoose');

//maintains connection over

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

//so when it saves something here mongoose takes care of order so I guess it will wait for the connection above

//..promises were originally from like bluebird

//create a new model

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1, //the length has to be atleast 1
    trim: true //take out trailing and leading spaces
  },
  completed:{
    type: Boolean,
    default: false
  },
  //lets you know when you completed a todo
  completedAt: {
    type: Number,
    default: null
  }
});

//new instance of Todo
var newTodo = new Todo({/*no content receives error because a string for text is required and none is provided*/});


//saves the above to the mongo db
newTodo.save().then((doc)=>{
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});

var tryTrim = new Todo({
  text: '    Edit this video'
});

tryTrim.save().then((doc)=>
{
  console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
  console.log('unable to trim');
});


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

var newUser = new user({
  name: 'Chris',
  email: '          www.victobiz'
});

newUser.save().then((doc)=>{
  console.log(doc);
}, (e) => {
  console.log('no worky');
});


//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
