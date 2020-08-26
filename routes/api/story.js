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
// @desc Create a story
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

      const newStory = new Story({
        owner: req.user.id,
        title: req.body.title
      });

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
  '/:id',
  [
    auth,
    roles,
    checkObjectId
  ], async (req, res) => {

    try {
      const story = await Story.findById(req.params.id);

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

// @route Delete api/stories/:id
// @desc Delete a story
// @access Private
router.delete(
  '/:id', [
  auth,
  roles,
  checkObjectId
], async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ msg: 'Story not found.' });
    }

    // Check user
    if (story.owner != req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    // BC I'm looking up based on the slug, can only delete by adding '[0]' after story, because the story variable at the top, returns an array with a single object. So, gotta use the [0] to reference the object's place in the array otherwise it returns undefined. 
    await story.remove();

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

// @route api/:id/
// @desc Create and update a post
// @access Private
router.post(
  '/:id/',
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
      const story = await Story.findById(req.params.id);
      let getPosts = await Post.find();

      const storyId = story._id;
      console.log(typeof(storyId));

      for (let i = 0; i < getPosts.length; i++) {
        if (JSON.stringify(getPosts[i].story) == JSON.stringify(storyId)) {
          if (getPosts[i].title === req.body.title) {
            return res.status(401).json({ msg: "Please choose a unique title" });
          }
        }
      }

      if (!user || !story) {
        return res.status(400).json({ msg: 'Story or User not found.' });
      }

      const newPost = new Post({
        story: story._id,
        owner: req.user.id,
        name: user.name,
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
      });

      await newPost.save();

      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error.')
    }
  }
);

// @route PUT api/slug/post
// @desc update a post
// @access Private
router.put(
  '/:id/:postId',
  [
    auth,
    roles
  ], async (req, res) => {

    try {
      const story = await Story.findById(req.params.id);
      let getPosts = await Post.find();
      const storyId = story._id;

      for (let i = 0; i < getPosts.length; i++) {
        if (getPosts[i].story == storyId) {
          if (getPosts[i].title === req.body.title) {
            return res.status(401).json({ msg: "Please choose a unique title" });
          }
        }
      }

      const post = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        {
          $set: {
            title: req.body.title,
            markdown: req.body.markdown
          }
        }, {
        new: true,
        upsert: true
      }
      );

      res.json(post);

    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server Error." });
    }
  }
);

// @route GET api/slug/post
// @desc get post
// @access Public
router.get(
  '/:slug/:postSlug',
  async (req, res) => {
    try {
      //const post = new Post.find().sort({ data: -1 });
      const story = await Story.find({ slug: req.params.slug });
      const post = await Post.find({ postSlug: req.params.postSlug });
      console.log(post)
      if (!story[0]) {
        return res.status(404).json({ msg: 'Cannot find the Story' });
      }

      if (!post[0]) {
        return res.status(404).json({ msg: 'Cannot find the Post' });
      }

      res.json(post[0])
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error.' });
    }
  }
)

// @route Delete api/stories/:id/:postId
// @desc Delete a post
// @access Private
router.delete(
  '/:id/:postId',
  [
    auth,
    roles
  ], async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ msg: "Post not found." });
      }

      if (post.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized." });
      }

      await post.remove();

      res.json({ msg: "Post removed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server Error." })
    }
  }
)

module.exports = router;