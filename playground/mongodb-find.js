//connect to mongo client

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



//connect to mongodb takes an argument such as heroku or other url in this case local host.
//then the callback takes an error and db object where we issue commands to read and write data
//so this will create a todoapp database from what i understand, but you have to add data for a
//db to actually be created.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
   return console.log('Unable to connect to MongoDB server');
  }//you dont really need an else here but you can if you want
  console.log('connected to MongoDB server');
  //to array returns a promise so you can add a .then to it

  //this to just get all the data
  //db.collection('Todos').find().toArray().then((docs) =>
  //this to make a specific query this can be Id or whatever
  //db.collection('Todos').find({completed:false}).toArray().then((docs) =>
  //to query by ID you use new for some reason
  db.collection('Todos').find({_id: new ObjectID ('59248c0053c9982608928be8')}).toArray().then((docs) =>
  {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);

  });

  //this interferes with code above
  //db.close();
});
