import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const uri =
  "mongodb://mongo:l2lZtyU6meQBbIz89yN4@containers-us-west-71.railway.app:7140";

const client = new MongoClient(uri);
client.db("test");

const routes = express.Router();

routes.get("/listar", async (_, response) => {
  const database = client.db("test");
  const cursor = database.collection("gastos");
  const gastos = await cursor.find().toArray();

  response.json({ gastos });
});

routes.post("/cadastrar", async (request, response) => {
  const database = client.db("test");
  const cursor = database.collection("gastos");

  const gasto = request.body;
  const result = await cursor.insertOne({
    ...gasto,
  });

  response.json({ gasto: result });
});

routes.delete("/excluir", async (request, response) => {
  const database = client.db("test");
  const cursor = database.collection("gastos");

  const id = request.body.id;

  const result = await cursor.deleteOne({
    _id: new ObjectId(id),
  });

  response.json({ gasto: result });
});

export default routes;
