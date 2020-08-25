const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const roles = require('../../middleware/roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
  check,
  validationResult
} = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');

// @route post api/post
// @desc Create a post
// @access Private
router.post('/', [
  auth,
  roles,
  [
    check('title', 'Admin requires a Title').not().isEmpty(),
    check('markdown', 'Admin requires a body').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      owner: req.user.id,
      name: user.name,
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.')
  }
});

// @route GET api/posts
// @desc Get all posts
// @Public
router.get('/', 
  async (req, res) => {
    try {
      const posts = await Post.find().sort({ data: -1 });
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error.')
    }
  }
)

module.exports = router;