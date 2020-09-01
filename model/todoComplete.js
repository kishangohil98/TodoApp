const mongoose = require("mongoose");

const todoCompleteSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  todoEmail: {
    type: String,
    required: true,
  },
  todoAssignTime: {
    type: Date,
    required: true,
  },
  todoCompleteTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = TodoComplete = mongoose.model(
  "todoComplete",
  todoCompleteSchema
);
