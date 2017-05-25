//connect to mongo client

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
   return console.log('Unable to connect to MongoDB server');
  }//you dont really need an else here but you can if you want
  console.log('connected to MongoDB server');

  //findonetoupdate

  //findOneAndUpdate(filter, update, options, callback)
//   db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5925251e11b9e2a53181e488')},
//   { $set: {completed: true}
// },
//   {returnOriginal: false}).then((result)=> {console.log(result);});


 //change the name and increment a record by one
 db.collection('Users').findOneAndUpdate({name: 'chris'},
{
  $set: {name: 'Joe'},
  $inc: {age: 5}
}, {returnOriginal: false}).then((result)=>{console.log(result);});
  //this interferes with code above
  //db.close'();'
});
