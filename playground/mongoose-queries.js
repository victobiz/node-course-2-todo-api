const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {user} = require('./../server/models/user');

var id = '5927ded8178caf2378d7446c';

if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}

// Todo.find({
//   _id: id
// }).then((todos) =>{
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) =>{
//   console.log('Todo', todo);
// });

//no underscore neccessary for id
// Todo.findById(id).then((todo) =>{
//   if (!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));


user.findById(id).then((users) => {
  if(!users){
    return console.log('no user');
  }
  console.log('user is', users);
}).catch((e)=>{
  console.log(e);
});

//challenge:
//query user collection (grab an id from user db)
//load in user mongo db
//user.findById and three cases
//first case query works but no user
//case user was found print user to screen
//handle errors print error object to screen.
