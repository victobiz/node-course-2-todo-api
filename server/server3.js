//this connects to the db

const _= require('lodash');
const express = require('express');


//converts json to object attach to request object
const bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User}= require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
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
  });
});

app.get('/todos/:id', (req, res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send(/*no value send back empty body*/);
  }
  Todo.findById(id).then((todo) =>{
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});

  }).catch((e) => {
    res.status(400).send();
  });

  //res.send(req.params);
  //validate id using isValid
  //if not valid stop and respond with 404 and send back empty body so send with no value send()
  //after query databse by findByID look for matching document 2 ways this could go success case and error case if error
  //send back 400 and send empty body back
  //for the sucees case in tod send back the todo if no todo call suceeded but id not exist send back a 404 with empty body


});

app.delete('/todos/:id', (req, res) => {
//get the id
var id = req.params.id;
//validate the id if not valid return 404
if(!ObjectID.isValid(id)){
  return res.status(404).send();
}

Todo.findByIdAndRemove(id).then((todo)=>{
  if(!todo){
    return res.status(404).send();
  }
  res.send({todo});
}).catch((e) => {
  res.status(400).send();
});
//remove todo by id
   //sucess or error if 400 with empty body
   //if sucess send doc back with 200
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(port, ()=> {
  console.log(`started up at port ${port}`);
});

module.exports = {app};
