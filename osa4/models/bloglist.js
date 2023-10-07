const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to ...')
mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB !')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const bloglistSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

bloglistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Bloglist', bloglistSchema)
