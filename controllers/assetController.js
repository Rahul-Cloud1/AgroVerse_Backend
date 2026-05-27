const Asset = require('../models/Asset');

exports.createAsset = async (req, res) => {
  try {
    const asset = new Asset({ ...req.body, userId: req.user.id });
    await asset.save();
    res.status(201).json({ 
      message: req.i18n.t('assets.create.success'),
      asset 
    });
  } catch (err) {
    res.status(500).json({ message: req.i18n.t('assets.create.error') });
  }
};

exports.getAssetsByUser = async (req, res) => {
  try {
    const assets = await Asset.find({ userId: req.user.id });
    res.json({ 
      message: req.i18n.t('assets.list.success'),
      assets 
    });
  } catch (err) {
    res.status(500).json({ message: req.i18n.t('assets.list.error') });
  }
};
