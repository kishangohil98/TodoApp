const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  todoEmail: {
    type: String,
    required: true,
  },
  todo_add_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Todo = mongoose.model("todo", todoSchema);
