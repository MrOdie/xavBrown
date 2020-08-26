const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  story: {
    type: Schema.Types.ObjectId
  }
},
  {
    timestamps: true,
  }
);

PostSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', PostSchema);