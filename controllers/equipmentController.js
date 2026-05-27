const Equipment = require('../models/Equipment');

exports.createEquipment = async (req, res) => {
  try {
    const equipment = new Equipment(req.body);
    await equipment.save();
    res.status(201).json({ 
      message: req.i18n.t('equipment.create.success'),
      equipment 
    });
  } catch (err) {
    res.status(400).json({ message: req.i18n.t('equipment.create.error'), error: err.message });
  }
};

exports.getAllEquipment = async (req, res) => {
  try {
    const filter = {};
    if (req.query.ownerId) filter.ownerId = req.query.ownerId;
    const equipment = await Equipment.find(filter);
    res.json({ 
      message: req.i18n.t('equipment.list.success'),
      equipment 
    });
  } catch (err) {
    res.status(500).json({ message: req.i18n.t('equipment.list.error'), error: err.message });
  }
};