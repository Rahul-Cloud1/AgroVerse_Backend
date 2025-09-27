const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  ownerId: String,
  imageUrl: String, // Optional: for image uploads
});

module.exports = mongoose.model('Equipment', EquipmentSchema);