const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // Check for user role

  if (req.user.role === 'admin') {
    console.log('success');
  } else {
    console.log('failure');
  }

  try {
    if (req.user.body !== 'admin'){
      return res.status(401).json({
        msg: 'Access Restricted'
      });
    }

    next();
  } catch (err) {
    console.log('Something is wrong with the Role Middleware');
    res.status(500).json({
      msg: 'Server Error.'
    })
  }
}