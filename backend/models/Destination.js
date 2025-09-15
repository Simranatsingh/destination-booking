const mongoose = require("mongoose");
const DestinationSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.model("Destination", DestinationSchema);
