//this connects to the db

var express = require('express');


//converts json to object attach to request object
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User}= require('./models/user');

var app = express();
//takes middlewear
//return value is a function that is the middlewear we need to give to express
app.use(bodyParser.json());
//configure routes

//send post resource and send it as body -- send a json object to server with text property
//server will create text property and send back to client

//for creating new todo
app.post('/todos', (req, res)=> {
  //the body gets stored by bodyparser.
  var todo = new Todo({
    text: req.body.text
  });
   todo.save().then((doc) => {

     res.send(doc);
   }, (e) => {
     //send 400 bad request
     res.status(400).send(e);
   });
  console.log(req.body);
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    //using the object allows greater flexibility because you can add more properties like custom status
    //code. When you send an array back it has a less flexible future.
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(3000, ()=> {
  console.log('Started on port 3000');
});

module.exports = {app};
