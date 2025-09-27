const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  type: String,
  description: String,
  quantity: Number,
});

module.exports = mongoose.model('Asset', assetSchema);
