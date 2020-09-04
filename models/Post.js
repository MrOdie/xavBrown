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
  slug: {
    type: String,
    required: true,
    unique: true
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  storyId: {
    type: Schema.Types.ObjectId
  },
  storySlug: {
    type: String
  },
  storyTitle: {
    type: String
  }
},
  {
    timestamps: true,
  }
);

PostSchema.pre("validate", function (next) {
  const post = this;

  if (post.title) {
    post.slug = slugify(post.title, { lower: true, strict: true });
  }

  next();
});

PostSchema.plugin(uniqueValidator);

module.exports = mongoose.model('post', PostSchema);