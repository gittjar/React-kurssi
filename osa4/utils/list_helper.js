const dummy = () => {
    return 1; // Return a fixed value of 1, as this is what the test expects
  }

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null; // Return null for an empty list
    }
  
    let mostLikedBlog = blogs[0]; // Initialize with the first blog
    for (let i = 1; i < blogs.length; i++) {
      if (blogs[i].likes > mostLikedBlog.likes) {
        mostLikedBlog = blogs[i];
      }
    }
  
    // Return the blog with the most likes
    return {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes,
    };
  };
  
  module.exports = {
    dummy,
    totalLikes,
    mostLikes
  }
  
  