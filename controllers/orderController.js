const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, total, address, contact, paymentMode } = req.body;

    // Auth check
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include at least one item' });
    }

    // Validate address & contact
    if (!address || !contact) {
      return res.status(400).json({ message: 'Address and contact are required' });
    }

    // Validate total
    if (!total || total <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    // Validate payment mode
    const allowedPaymentModes = ['COD', 'ONLINE', 'UPI'];
    if (paymentMode && !allowedPaymentModes.includes(paymentMode)) {
      return res.status(400).json({ message: 'Invalid payment mode' });
    }

    const order = new Order({
      buyerId: req.user.id,
      items,
      total,
      address,
      contact,
      paymentMode,
    });

    await order.save();

    res.status(201).json({
      message: req.i18n.t('orders.create.success'),
      order
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: req.i18n.t('orders.create.error'),
      error: err.message
    });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const orders = await Order.find({ buyerId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      message: req.i18n.t('orders.list.success'),
      orders
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: req.i18n.t('orders.list.error'),
      error: err.message
    });
  }
};