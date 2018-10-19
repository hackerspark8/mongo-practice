const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  async (err, client) => {
    if (err) {
      return console.error("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");
    const count = await db
      .collection("Todos")
      .find({ _id: new ObjectID("5bc78c56de2c9652c4fa46a8") })
      .count();
    console.log(count);
  }
);
