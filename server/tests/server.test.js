const expect = require("expect");
const supertest = require("supertest");

const { app } = require("../server");
const { Todo } = require("../models/todo");

const TODOS = [
  {
    text: "1st todo"
  },
  {
    text: "2nd todo"
  }
];

describe("POST /todos", () => {
  beforeEach(done => {
    Todo.remove({})
      .then(() => {
        return Todo.insertMany(TODOS);
      })
      .then(() => done());
  });

  it("should create a new todo", done => {
    const text = "Text todo test";
    supertest(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => expect(res.body.text).toBe(text))
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create todo with invalid body data", done => {
    supertest(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        try {
          let todos = await Todo.find();
          expect(todos.length).toBe(TODOS.length);
          done();
        } catch (e) {
          done(e);
        }
      });
  });
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    supertest(app)
      .get("/todos")
      .expect(200)
      .expect(res => expect(res.body.todos.length).toBe(TODOS.length))
      .end(done);
  });
});
