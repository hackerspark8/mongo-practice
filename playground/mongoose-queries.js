const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");

const _id = "5bcac2069b62e187b853a55b";

Todo.find({ _id }).then(todos => console.log("Todos", todos));

Todo.findOne({ _id }).then(todo => console.log("Todo", todo));

if (ObjectID.isValid(_id)) {
  Todo.findById(_id).then(todo => {
    console.log("Todo", todo);
  });
}
