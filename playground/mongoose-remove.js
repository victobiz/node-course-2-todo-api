const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {user} = require('./../server/models/user');

//remove all documents
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//find one and remove

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5932051e11b9e2a53182a4dc').then((doctodo) => {
console.log(doctodo)
});

//when you need to delete somthing beside id
Todo.findOneAndRemove({_id: '5932051e11b9e2a53182a4dc'}).then(doctodo) => {
  console.log(doctodo)
});
