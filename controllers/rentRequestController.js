const RentRequest = require('../models/RentRequest');
const Equipment = require('../models/Equipment');

exports.createRentRequest = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.body.equipmentId);
    if (!equipment) return res.status(404).json({ error: 'Equipment not found' });

    const rentRequest = new RentRequest({
      equipmentId: req.body.equipmentId,
      equipmentName: equipment.name,
      ownerId: equipment.ownerId,
      requestedBy: req.body.userId,
    });
    await rentRequest.save();
    res.status(201).json(rentRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRequestsForOwner = async (req, res) => {
  try {
    const requests = await RentRequest.find({ ownerId: req.query.ownerId });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const request = await RentRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};