const express = require("express");
const router = express.Router();
const Todo = require("../model/todo");

router.post("/", async (req, res) => {
  //   console.log(req.body);
  //   res.send("this is todo post route");

  const { todo } = req.body;
  const todoEmail = req.header("todo-email");
  console.log(todo);
  if (!todo || !todoEmail) {
    return res
      .status(400)
      .json({ msg: "Todo can not be Empty and You must include Email" });
  }
  try {
    let addTodo = new Todo({
      todo,
      todoEmail,
    });

    await addTodo.save();
    const todos = await Todo.find({ todoEmail: todoEmail }).sort({
      todo_add_time: -1,
    });
    res.status(200).json(todos);
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
    const todos = await Todo.find({ todoEmail }).sort({
      todo_add_time: -1,
    });
    res.status(200).json(todos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
