const Destination = require("../models/destination");

exports.getAll = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
