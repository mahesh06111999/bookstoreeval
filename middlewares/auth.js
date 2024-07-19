const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.isAuthenticated = (req, res, next) => {
  const token = req.session.token || '';
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

exports.isAdmin = async (req, res, next) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
  const user = rows[0];
  if (user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
