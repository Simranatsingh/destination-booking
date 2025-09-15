const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const destinationsRoutes = require("./routes/destination");
const hotelsRoutes = require("./routes/hotel");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);
app.use("/api/destinations", destinationsRoutes);
app.use("/api/hotels", hotelsRoutes);
app.get("/", (req, res) => {
  res.send("API is running");
});
module.exports = app;
