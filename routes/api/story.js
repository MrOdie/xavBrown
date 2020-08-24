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
const Story = require('../../models/Story');

// @route Post api/stories
// @desc Create a stories
// @Private

router.post(
  '/',
  [
    auth,
    roles,
    [
      check('title', 'You must have a title').not().isEmpty()
    ]
  ], async (req, res) => {
    const errors = validationResult(req);

    if(!errors){
      return res.status(400).json({
        errors: errors.array()
      })
    }

    try {
      const stories = await Story.find();

      for(let i = 0; i < stories.length; i++){
        if(req.body.title === stories[i].title){
          return res.status(400).json({
            msg: 'Please Create a Unigue Story'
          })
        }
      }
      
      const user = await User.findById(req.user.id).select('-password');

      const newstory = new Story({
        owner: req.user.id,
        title: req.body.title
      });

      const story = await newstory.save();

      res.json(story);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error.');
    }
  }
);

// @route Get api/stories
// @desc Get all Stories
// @Public
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().sort({ data: -1})
    res.json(stories);
  } catch (err){
    console.error(err);
    res.status(500).send('Server Error.')
  }
});

module.exports = router;