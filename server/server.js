const express = require("express");
const bodyParser = require("body-parser");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();
app.use(bodyParser.json());
app.post("/todos", async (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });
  try {
    todo = await todo.save();
    res.send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send({ todos });
  } catch (e) {
    res.status(400).send(e);
  }
});
app.listen(3000, () => console.log("Started on port 3000"));

module.exports = { app };
