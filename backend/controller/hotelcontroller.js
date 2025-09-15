const Hotel = require("../models/hotel");

exports.getByDestination = async (req, res) => {
  try {
    const hotels = await Hotel.find({ destinationId: req.query.destinationId });
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
