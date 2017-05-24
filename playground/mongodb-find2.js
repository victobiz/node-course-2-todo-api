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

  //query for count the documentation does it like this .count().function(err, response)=>{} they use a callback not promise
  // db.collection('Users').find().count().then((count) =>
  // {
  //   console.log('Users:');
  //   console.log(`count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  //
  // });

  db.collection('Users').find({name:'ellen'}).toArray().then((docs)=>{
    console.log('Users:');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err)=>{
    console.log('Unable to fetch user ellen', err);
  });

  //this interferes with code above
  //db.close();
});
