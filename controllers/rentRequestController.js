const RentRequest = require('../models/RentRequest');
const Equipment = require('../models/Equipment');

exports.createRentRequest = async (req, res) => {
  try {
    const { equipmentId, userId } = req.body;

    // Validate fields
    if (!equipmentId || !userId) {
      return res.status(400).json({
        message: 'equipmentId and userId are required',
      });
    }

    // Find equipment
    const equipment = await Equipment.findById(equipmentId);

    if (!equipment) {
      return res.status(404).json({
        message: 'Equipment not found',
      });
    }

    // Create request
    const rentRequest = new RentRequest({
      equipmentId,
      equipmentName: equipment.name,
      ownerId: equipment.ownerId,
      requestedBy: userId,
      status: 'pending',
    });

    await rentRequest.save();

    res.status(201).json({
      message: 'Rent request created successfully',
      rentRequest,
    });

  } catch (err) {
    console.log('Create Rent Request Error:', err);

    res.status(500).json({
      message: 'Failed to create rent request',
      error: err.message,
    });
  }
};

exports.getRequestsForOwner = async (req, res) => {
  try {
    const { ownerId } = req.query;

    if (!ownerId) {
      return res.status(400).json({
        message: 'ownerId is required',
      });
    }

    const requests = await RentRequest.find({ ownerId });

    res.status(200).json({
      message: 'Requests fetched successfully',
      requests,
    });

  } catch (err) {
    console.log('Get Requests Error:', err);

    res.status(500).json({
      message: 'Failed to fetch requests',
      error: err.message,
    });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    const updatedRequest = await RentRequest.findByIdAndUpdate(
      requestId,
      { status: 'approved' },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        message: 'Rent request not found',
      });
    }

    res.status(200).json({
      message: 'Request approved successfully',
      request: updatedRequest,
    });

  } catch (err) {
    console.log('Approve Request Error:', err);

    res.status(500).json({
      message: 'Failed to approve request',
      error: err.message,
    });
  }
};