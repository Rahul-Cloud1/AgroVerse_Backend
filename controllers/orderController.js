const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, buyerId: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.id }).populate('assetId');
    res.json(orders);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
