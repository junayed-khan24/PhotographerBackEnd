const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Photographer Backend is running!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});