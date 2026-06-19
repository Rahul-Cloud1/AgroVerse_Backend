const mongoose = require('mongoose');
 
const orderItemSchema = new mongoose.Schema(
 {
    productId: String,
   name: String,
    price: Number,
   quantity: Number,
  },
  { _id: false }
);

 const orderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset' },
  quantity: Number,
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [orderItemSchema], default: [] },
  total: { type: Number, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  paymentMode: { type: String, default: 'COD' },
   status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
   createdAt: { type: Date, default: Date.now }
 });

module.exports = mongoose.model('Order', orderSchema);
