const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model("Hotel", hotelSchema);
