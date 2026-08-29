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

async function run() {
  try {
    await client.connect();

    console.log("Successfully connected to MongoDB!");

    // Database
    const database = client.db("photographerDB");

    // Collection
    const bookingsCollection = database.collection("bookings");

    // Home Route
    app.get("/", (req, res) => {
      res.send("Photographer Backend is running!");
    });

    // Create Booking
    app.post("/bookings", async (req, res) => {
      try {
        const booking = req.body;

        booking.createdAt = new Date();

        const result = await bookingsCollection.insertOne(booking);

     
      } catch (error) {
        console.error(error);

      }
    });

   

  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

run();

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});