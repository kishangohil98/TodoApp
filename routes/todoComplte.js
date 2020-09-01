const express = require("express");
const router = express.Router();
const Todo = require("../model/todo");
const TodoComplete = require("../model/todoComplete");

router.put("/:todoid", async (req, res) => {
  //   console.log("put api called");
  //   res.send("this is put api");
  try {
    const todo = await Todo.findById(req.params.todoid);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not Found" });
    }
    const updateTodo = {
      todoDone: todo.todo,
      todoEmail: todo.todoEmail,
      todoAssignTime: todo.todo_add_time,
    };

    await Todo.findByIdAndRemove({ _id: req.params.todoid });

    let Todo_Done = new TodoComplete({
      todo: updateTodo.todoDone,
      todoEmail: updateTodo.todoEmail,
      todoAssignTime: updateTodo.todoAssignTime,
    });

    await Todo_Done.save();

    const todoDone = await Todo.find({ todoEmail: updateTodo.todoEmail }).sort({
      todo_add_time: -1,
    });

    res.status(200).json(todoDone);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  const todoEmail = req.header("todo-email");
  if (!todoEmail) {
    return res.status(404).json({ msg: "You must include Email" });
  }
  try {
    let todos = await TodoComplete.find({ todoEmail }).sort({
      todoCompleteTime: -1,
    });
    res.status(200).json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
