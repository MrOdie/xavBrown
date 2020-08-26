const mongoose = require('mongoose');
const Story = require('../models/Story');

const checkObjectId = async (req, res, next) => {

  try {
    const story = await Story.findById(req.params.id);
    const idToCheck = story._id;

    if (!mongoose.Types.ObjectId.isValid(idToCheck)) {
      return res.status(400).json({
        msg: 'Invalid ID'
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