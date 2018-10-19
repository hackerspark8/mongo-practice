const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  async (err, client) => {
    if (err) {
      return console.error("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");
    const deleteResult = await db
      .collection("Todos")
      .deleteMany({ text: "Take dog on a walk" });
    console.log(deleteResult);
  }
);
