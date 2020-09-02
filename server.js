const express = require("express");
const app = express();
const connectDb = require("./db");
const path = require("path");

require("dotenv").config();

//connect to database
connectDb();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/api/todo", require("./routes/addTodo"));
app.use("/api/todo_update", require("./routes/todoComplte"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  //console.log("fr called");

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});
