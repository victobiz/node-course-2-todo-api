const{ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const{Todo} = require('./../../models/todo');
const{User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

//the token is the encrypted ID
const users = [{
_id: userOneId,
email: 'chris@yahoo.com',
password: 'userOnePass',
tokens: [{
  access: 'auth',
  token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
}]
}, {
_id: userTwoId,
email: 'joe@example.com',
password: 'userTwoPass',
tokens: [{
  access: 'auth',
  token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
}]
}];


//the creator is just the user ID
const todos = [{
  //call from mongodb
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  //similar to mongodb native method that wipes all our todos
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
//all takes an array of promises
  return Promise.all([userOne, userTwo])
}).then(()=> done());
};

module.exports ={todos, populateTodos, users, populateUsers};
