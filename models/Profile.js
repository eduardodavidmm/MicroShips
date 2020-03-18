const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  breed: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  bio: {
    type: String
  },
  information: [
    {
      age: {
        type: Number
      },
      location: {
        type: String
      },
      current: {
        type: Boolean,
        default: false
      }
    }
  ],
  contact: {
    phone: {
      type: String
    },
    email: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
