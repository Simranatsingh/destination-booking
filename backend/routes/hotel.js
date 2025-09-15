const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel");

router.get("/", async (req, res) => {
  try {
    const { destinationId } = req.query;
    const query = destinationId ? { destinationId } : {};
    const hotels = await Hotel.find(query);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log("POST /api/hotels called with data:", req.body);
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hotel) return res.status(404).json({ error: "Hotel not found" });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
