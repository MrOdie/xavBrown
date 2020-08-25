const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const roles = require('../../middleware/roles');
const checkObjectId = require('../../middleware/checkObjectId');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
  check,
  validationResult
} = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');
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

    if (!errors) {
      return res.status(400).json({
        errors: errors.array()
      })
    }

    try {
      const stories = await Story.find();

      for (let i = 0; i < stories.length; i++) {
        if (req.body.title === stories[i].title) {
          return res.status(400).json({
            msg: 'Please Create a Unigue Story'
          })
        }
      }

      const user = await User.findById(req.user.id).select('-password');
      console.log(req.body.title);
      const newStory = new Story({
        owner: req.user.id,
        title: req.body.title
      });

      console.log(newStory);

      const story = await newStory.save();

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
    const stories = await Story.find().sort({ data: -1 })
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error.')
  }
});

// @route Get api/stories/:slug
// @desc Get Story by ID
// @access Private
router.get(
  '/:slug',
  [
    auth,
    roles,
    checkObjectId
  ], async (req, res) => {

    try {
      const story = await Story.find({ slug: req.params.slug });

      if (!story) {
        return res.status(404).json({
          msg: 'Story not found.'
        })
      }

      res.json(story);
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error.')
    }
  }
);

// @route Delete api/posts/:slug
// @desc Delete a route by slug
// @access Private
router.delete(
  '/:slug', [
  auth,
  roles,
  checkObjectId
], async (req, res) => {
  try {
    const story = await Story.find({ slug: req.params.slug });

    if (!story) {
      return res.status(404).json({ msg: 'Story not found.' });
    }

    const storyOwnerString = story[0].owner.toString();

    // Check user
    if (storyOwnerString !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    // BC I'm looking up based on the slug, can only delete by adding '[0]' after story, because the story variable at the top, returns an array with a single object. So, gotta use the [0] to reference the object's place in the array otherwise it returns undefined. 
    await story[0].remove();

    res.json({ msg: 'Post removed.' });

  } catch (err) {
    console.error(err);
    return res.status(500)
  }

});

/*
*
* STARTING THE INDIVIDUAL POST SECTION
*
*/

// @route api/:slug/:post
// @desc Create a post
// @access Private
router.post(
  '/:slug/',
  [
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
      const story = await Story.find({ slug: req.params.slug });
      let getPosts = await Post.find();

      for (let i = 0; i < getPosts.length; i++) {
        if (getPosts[i].title === req.body.title){
          return res.status(401).json({ msg: "Please choose a unique title" });
        }
      }

      if (!user || !story[0]) {
        return res.status(400).json({ msg: 'Story or User not found.' });
      }

      const newPost = new Post({
        owner: req.user.id,
        name: user.name,
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
      });

      console.log(story[0])

      story[0].posts.unshift(newPost);

      await story[0].save();

      res.json(story[0].posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error.')
    }
  }
);

router.get(
  '/:slug/',
  [
    auth,
    roles
  ], async (req, res) => {
    try {
      const post = new Post.find().sort({ data: -1 });

      res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error.' });
    }
  }
)

module.exports = router;