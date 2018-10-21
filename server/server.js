const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const _ = require("lodash");

require("./config/config");
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
app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  } catch (e) {
    return res.status(400).send(e);
  }
});
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  try {
    const todo = await Todo.findByIdAndRemove(id);
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  } catch (e) {
    res.status(400).send(e);
  }
});
app.patch("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ["text", "completed"]);
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).send();
    }
    return res.send({ todo: updatedTodo });
  } catch (e) {
    return res.status(400).send(e);
  }
});
app.listen(process.env.PORT, () =>
  console.log(
    `Started under ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
);

module.exports = { app };
