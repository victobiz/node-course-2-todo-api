var mongoose = require('mongoose');
//maintains connection over
mongoose.Promise = global.Promise;

mongoose.connect( process.env.MONGODB_URI ||'mongodb://localhost:27017/TodoApp');

module.exports ={
  mongoose:mongoose
};
