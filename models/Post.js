const mongoose = require('mongoose');
const { default: slugify } = require('slugify');
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
    required: true
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
})

module.exports = mongoose.model('Post', PostSchema);