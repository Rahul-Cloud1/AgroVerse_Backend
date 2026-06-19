const jwt = require('jsonwebtoken');
 
 const authMiddleware = (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) return res.status(401).json({ message: 'No token provided' });

  // Accept both "Bearer <token>" (what the app sends) and a raw token,
  // since jwt.verify will throw on anything that isn't the bare JWT.
 const token = header.startsWith('Bearer ') ? header.slice(7).trim() : header;
 
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
