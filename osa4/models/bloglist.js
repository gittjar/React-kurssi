const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  anonymous: {
    type: Boolean,
    default: false,
  },
});

const bloglistSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  comments: [commentSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});



bloglistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Bloglist', bloglistSchema);
