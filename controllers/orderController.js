const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, buyerId: req.user.id });
    await order.save();
    res.status(201).json({ 
      message: req.i18n.t('orders.create.success'),
      order 
    });
  } catch (err) {
    res.status(500).json({ message: req.i18n.t('orders.create.error') });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.id }).populate('assetId');
    res.json({ 
      message: req.i18n.t('orders.list.success'),
      orders 
    });
  } catch (err) {
    res.status(500).json({ message: req.i18n.t('orders.list.error') });
  }
};
