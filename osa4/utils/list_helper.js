const dummy = () => {
    return 1; // Return a fixed value of 1, as this is what the test expects
  }

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
}  
  
  module.exports = {
    dummy,
    totalLikes
  }
  
  