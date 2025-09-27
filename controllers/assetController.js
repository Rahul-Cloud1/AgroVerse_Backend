const Asset = require('../models/Asset');

exports.createAsset = async (req, res) => {
  try {
    const asset = new Asset({ ...req.body, userId: req.user.id });
    await asset.save();
    res.status(201).json(asset);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.getAssetsByUser = async (req, res) => {
  try {
    const assets = await Asset.find({ userId: req.user.id });
    res.json(assets);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
