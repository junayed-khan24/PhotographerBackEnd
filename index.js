const express = require("express");
const cors = require("cors");
import { MongoClient } from 'mongodb';


const app = express();
const port = process.env.PORT || 5000;

// MIDILEware
app.use(cors());
app.use(express.json());





const client = new MongoClient("mongodb+srv://:<db_password>@cluster0.i9yr5cu.mongodb.net/?appName=Cluster0");

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await client.close();
}



app.get("/", (req, res) => {
  res.send("Photographer Backend is running!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});