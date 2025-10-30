const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_super_secret_jwt_key_here'; 

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  jwt.verify(token, JWT_SECRET, (err, userData) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    req.user = userData;
    next(); 
  });
};

module.exports = { authenticateToken };