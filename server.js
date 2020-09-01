const express = require("express");
const app = express();
const connectDb = require("./db");
const connectDB = require("./db");

require("dotenv").config();

//connect to database
connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/api/todo", require("./routes/addTodo"));
app.use("/api/todo_update", require("./routes/todoComplte"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
