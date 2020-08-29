const mongoose = require('mongoose');
const Story = require('../models/Story');
const Post = require('../models/Post');

const checkObjectId = async (req, res, next) => {

  try {
    const getStory = await Story.findById(req.params.id);
    const getPost = await Post.findById(req.params.id);

    const checkId = getStory === null ? getPost._id : getStory._id;

    if (!mongoose.Types.ObjectId.isValid(checkId)) {
      return res.status(400).json({
        msg: 'Invalid ID.'
      });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: 'Server Error.'
    })
  }

}

module.exports = checkObjectId;