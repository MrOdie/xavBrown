const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
  check,
  validationResult
} = require('express-validator');
const normalize = require('normalize-url');

const User = require('../../models/User');

// @route POST api/users
// @desc Register User
// @access Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty().isAlpha(), // these checks come from express-validator
  check('userName', 'Please include a user name with 8 or more characters').not().isEmpty().isLength({ min: 8 }),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Please enter a password with 12 or more characters').not().isEmpty().isLength({ min: 6 }) //.matches(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&\'()*+,-.\/:;<=>?@[\]^_`{|}~])[\w\d!"#$%&\'()*+,-.\/:;<=>?@[\]^_`{|}~]{12,40}$/, 'i')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { name, userName, email, password, role } = req.body;
  if (role !== 'basic') {
    return res.status(400).json({
      errors: [{ msg: 'Request denied.'}]
    })
  }
  
  try {
    let user = await User.findOne({ email });

    if (user.role !== role && role !== 'basic') {
      return res.status(400).json({
        errors: [{ msg: 'Request denied.'}]
      })
    }

    if (user) {
      return res.status(400).json({
        errors: [{ msg: 'User already exists.' }]
      });
    }

    user = new User({
      name,
      userName,
      email,
      password,
      role: role || "basic"
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: '5 days'
      }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});

module.exports = router;