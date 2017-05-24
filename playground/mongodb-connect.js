//connect to mongo client

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//create a new objectId using the mongodb package.
var obj = new ObjectID();
console.log(obj);


//es6 destructuring
var user = {name: 'andrew', age: 25};
var {name} = user;
console.log(name);


//connect to mongodb takes an argument such as heroku or other url in this case local host.
//then the callback takes an error and db object where we issue commands to read and write data
//so this will create a todoapp database from what i understand, but you have to add data for a
//db to actually be created.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
   return console.log('Unable to connect to MongoDB server');
  }//you dont really need an else here but you can if you want
  console.log('connected to MongoDB server');
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'ellen',
    age: 29,
    location: 'virginia'
  }, (err, result) => {
    if (err) {
      return console.log('unable to insert user', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops);
    console.log(result.ops[0]._id);
    console.log(result.ops[0]._id.getTimestamp());
  });
  db.close();
});
