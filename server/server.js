var mongoose = require('mongoose');

//maintains connection over

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

//so when it saves something here mongoose takes care of order so I guess it will wait for the connection above

//..promises were originally from like bluebird

//create a new model

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed:{
    type: Boolean
  },
  //lets you know when you completed a todo
  completedAt: {
    type: Number
  }
});

//new instance of Todo
var newTodo = new Todo({
  text: 'Cook dinner'
});

//saves the above to the mongo db
newTodo.save().then((doc)=>{
  console.log('Saved todo', doc);
}, (e) => {
  console.log('Unable to save todo');
});

//exercise

var secondTodo = new Todo({
  text: 'cheat on ellen',
  completed: false,
  completedAt: 1032
});

secondTodo.save().then((docs)=>{
  console.log('save second', docs);
}, (e) => {console.log('Unable to save second')
});
