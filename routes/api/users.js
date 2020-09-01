const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const roles = require('../../middleware/roles');
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
  check('name', 'Name is required').not().isEmpty(), // these checks come from express-validator
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

  const { name, userName, email, password } = req.body;

  try {
    let userEmail = await User.findOne({ email });
    let userUsername = await User.findOne({ userName });
    let role = null;

    if (userEmail) {
      return res.status(400).json({
        errors: [{ msg: 'User already exists.' }]
      });
    }

    if (userUsername) {
      return res.status(400).json({
        errors: [{ msg: 'Username already exists.' }]
      });
    }

    user = new User({
      name,
      userName,
      email,
      password,
      role
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

// @route GET api/users/all
// @desc Get all users
// @access Private
router.get(
  '/all',
  [
    auth,
    roles
  ], async (req, res) => {
    try {
      const checkUser = await User.findById(req.user.id);

      if (checkUser.role !== 'admin') {
        return res.status(401).json({ msg: "Permission Denied."})
      }

      const getUsers = await User.find().sort({ data: -1 }).select('-password');

      res.json(getUsers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error.');
    }
  }
)

module.exports = router;