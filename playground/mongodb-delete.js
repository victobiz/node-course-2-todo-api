//connect to mongo client

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
   return console.log('Unable to connect to MongoDB server');
  }//you dont really need an else here but you can if you want
  console.log('connected to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({text:'go to sleep'}).then((result)=>{
  //   console.log(result);
  // });
  //deleteOne
  // db.collection('Todos').deleteOne({text:'go to sleep'}).then((result)=>{
  //   console.log(result);
  // });
  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name:'chris'}).then((result)=>{
  //   console.log(result);
  // });

  db.collection('Users').deleteOne({name:'joe'}).then((result)=>{
    console.log(result);
  });


  //this interferes with code above
  //db.close'();'
});
