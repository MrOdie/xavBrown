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
  slug: {
    type: String,
    required: true,
    unique: true
  },
  posts: [
    {
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
      }
    }, {
      timestamps: true,
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
},
  {
    timestamps: true,
  });

StorySchema.pre("validate", function (next) {
  const post = this;

  if (post.title) {
    post.slug = slugify(post.title, { lower: true, strict: true });
  }
  if (post.posts[0] !== undefined && post.posts[0] !== null) {
    post.posts[0].slug = slugify(post.posts[0].title, { lower: true, strict: true })
  }

  next();
});

StorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Story', StorySchema);