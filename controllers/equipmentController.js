const Equipment = require('../models/Equipment');

exports.createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json(equipment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllEquipment = async (req, res) => {
  try {
    const filter = {};
    if (req.query.ownerId) filter.ownerId = req.query.ownerId;
    const equipment = await Equipment.find(filter);
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};