const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    minlength: 8,
    maxlength: 20,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'admin'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps: true,
});

module.exports = mongoose.model('user', UserSchema);