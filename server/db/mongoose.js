var mongoose = require('mongoose');

//maintains connection over
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mogodb://localhost:27017/TodoApp');

module.exports ={
  mongoose:mongoose
};



//process.env.NODE_ENV === 'production'
//process.env.NODE_ENV === 'development'
//process.env.NODE_ENV === 'test'
