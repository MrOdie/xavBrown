const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User')

module.exports = async (req, res, next) => {
  // Check for user role
  const user = await User.findById(req.user.id);

  try {
    if (user.role !== 'admin'){
      return res.status(401).json({
        msg: 'Access Restricted'
      });
    }
    console.log('is admin')
    next();
  } catch (err) {
    console.log('Something is wrong with the Role Middleware');
    res.status(500).json({
      msg: 'Server Error.'
    })
  }
}