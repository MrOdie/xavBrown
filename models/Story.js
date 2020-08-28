const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},
  {
    timestamps: true,
  });

StorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('story', StorySchema);