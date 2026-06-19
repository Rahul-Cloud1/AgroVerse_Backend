const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpe?g|png|webp|gif)$/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

router.post('/', auth, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.log('Upload error:', err.message);
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
   }
    // Build the URL from the actual request instead of a hardcoded host,
    // so it works in dev, on a LAN, and in production behind a proxy.
    const host = req.get('host');
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
   res.json({ url: `${protocol}://${host}/uploads/${req.file.filename}` });
  });
 });





module.exports = router;