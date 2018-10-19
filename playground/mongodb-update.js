const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect(
  "mongodb://localhost:27017/TodoApp",
  async (err, client) => {
    if (err) {
      return console.error("Unable to connect to MongoDB server");
    }
    console.log("Connected to MongoDB server");
    const db = client.db("TodoApp");
    const updateResult = await db.collection("Todos").findOneAndUpdate(
      {
        _id: new ObjectID("5bc999366cb2f0ad4c9ca144")
      },
      {
        $set: {
          completed: true
        }
      },
      {
        returnOriginal: false
      }
    );
    console.log(updateResult);
  }
);
