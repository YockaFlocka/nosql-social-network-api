const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, 'Please use a valid email address']  
    },
    
    // setting up a relationship with another model
    thoughts: [
        {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought"
    }
  ],
    friends: [
        {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
  },
  {
      toJSON: {
          virtuals: true,
      },
      id: false,
  });

  // creating a virtual that retrieves the length of the user's friends array
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  })

  const User = mongoose.model('User', userSchema);

  module.exports = User;