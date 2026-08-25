const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

dotenv.config();


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i9yr5cu.mongodb.net/?appName=Cluster0`
);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

async function disconnectFromMongoDB() {
  await client.close();
}

// Route
app.get("/", (req, res) => {
  res.send("Photographer Backend is running!");
});

// Start server
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);

  await connectToMongoDB()
});