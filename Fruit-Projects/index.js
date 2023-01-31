const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb://localhost:27017";
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("fruitsDB");
    const fruits = database.collection("fruits");
    // create a document to insert
    const doc = [
      {
        name: "Banana",
        score: "5",
        review: "It's all mix fruit juice",
      },
      {
        name: "Apple",
        score: "4",
        review: "Meh, it's okay I guess",
      },
      {
        name: "Orange",
        score: "2",
        review: "It's all sour",
      },
    ];
    const result = await fruits.insertMany(doc);
    console.log(result);
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
