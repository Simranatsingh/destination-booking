const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

router.get("/", async (req, res) => {
  const destinations = await Destination.find();
  res.json(destinations);
});

router.post("/", async (req, res) => {
  const destination = new Destination(req.body);
  await destination.save();
  res.status(201).json(destination);
});

router.put("/:id", async (req, res) => {
  const destination = await Destination.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(destination);
});

router.delete("/:id", async (req, res) => {
  await Destination.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
