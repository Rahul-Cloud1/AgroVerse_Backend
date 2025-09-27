const mongoose = require('mongoose');

const RentRequestSchema = new mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
  equipmentName: String,
  ownerId: String,
  requestedBy: String,
  status: { type: String, default: 'pending' }, // pending, approved, rejected
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('RentRequest', RentRequestSchema);