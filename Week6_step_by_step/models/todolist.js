var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TodoListSchema = new Schema({
  title: { type: String },

  current_todos: [
    {
      title: { type: String },
      description: { type: String },
    }
  ],

  completed_todos: [
    {
      title: { type: String },
      description: { type: String },
    }
  ],

});

module.exports = mongoose.model('TodoList', TodoListSchema);
