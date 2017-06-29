var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1, //the length has to be atleast 1
    trim: true //take out trailing and leading spaces
  },
  completed:{
    type: Boolean,
    default: false
  },
  //lets you know when you completed a todo
  completedAt: {
    type: Number,
    default: null
  },
  _creator:{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


module.exports={Todo};
