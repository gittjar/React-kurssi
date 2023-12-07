import React, { useState, useEffect } from 'react';

function UserBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');

  const initializeComments = (blogs) => {
    const initialComments = {};
    blogs.forEach((blog) => {
      initialComments[blog.id] = []; // Initialize comments for each blog
    });
    setComments(initialComments);
  };

  const fetchCommentsForBlog = async (blogId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3003/api/blogs/${blogId}/comments`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      });
      if (response.ok) {
        const fetchedComments = await response.json();
        setComments((prevComments) => ({
          ...prevComments,
          [blogId]: fetchedComments,
        }));
      } else {
        throw new Error('Failed to fetch comments');
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required');
      return;
    }

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    };

    fetch('http://localhost:3003/api/blogs/user/blogs', requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user blogs');
        }
      })
      .then((data) => {
        setUserBlogs(data);
        initializeComments(data); // Initialize comments state
        // Fetch comments for each blog
        data.forEach((blog) => {
          fetchCommentsForBlog(blog.id);
        });
      })
      .catch((error) => {
        setError('Error fetching user blogs: ' + error.message);
      });
  }, []);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }  

  const toggleDetails = (index) => {
    // Toggle the showDetails state for the specified blog index
    const updatedShowDetails = [...showDetails];
    updatedShowDetails[index] = !showDetails[index];
    setShowDetails(updatedShowDetails);
  };

  const handleLikeClick = async (blogId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }
  
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      };
  
      // Optimistically update the UI before the server responds
      const updatedBlogs = userBlogs.map((blog) =>
        blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
      );
      setUserBlogs(updatedBlogs);
  
      const response = await fetch(`http://localhost:3003/api/blogs/${blogId}/like`, requestOptions);
  
      if (!response.ok) {
        // Revert the update if there's an error
        setUserBlogs(userBlogs);
        throw new Error('Failed to update likes');
      }
    } catch (error) {
      console.error('Error updating likes:', error);
      setError('Error updating likes: ' + error.message);
    }
  };
  
  const handleDeleteClick = async (blogId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }
  
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      };
  
      const response = await fetch(`http://localhost:3003/api/blogs/${blogId}`, requestOptions);
      
      if (response.ok) {
        // Remove the deleted blog from the userBlogs state
        const updatedBlogs = userBlogs.filter((blog) => blog.id !== blogId);
        setUserBlogs(updatedBlogs);
      } else {
        setError('Failed to delete the blog');
      }
    } catch (error) {
      console.error('Error deleting the blog:', error);
      setError('Error deleting the blog: ' + error.message);
    }
  };

  const handleAddComment = async (blogId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }
  
      // Check if the comment is empty
      if (!newComment.trim()) {
        // User entered an empty comment
        return;
      }
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ content: newComment, anonymous: true }),
      };
  
      const response = await fetch(`http://localhost:3003/api/blogs/${blogId}/comments`, requestOptions);
  
      if (response.ok) {
        const updatedBlog = await response.json();
        setUserBlogs(userBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)));
  
        // Ensure comments[blogId] is defined and iterable
        setComments((prevComments) => ({
          ...prevComments,
          [blogId]: Array.isArray(prevComments[blogId])
            ? [...prevComments[blogId], { content: newComment, anonymous: true }]
            : [{ content: newComment, anonymous: true }],
        }));

        // Clear the input field after successfully adding a comment
        setNewComment('');
      } else {
        throw new Error('Failed to add a comment');
      }
    } catch (error) {
      console.error('Error adding a comment:', error);
      setError('Error adding a comment: ' + error.message);
    }
  };

  return (
    <div>
      <h2>User's Blogs</h2>
      <div className='blogiarea'>
        {userBlogs.map((blog, index) => (
          <div key={blog.id} className='blogibox'>
            {blog.title}<br/>
            <hr></hr>
            <button onClick={() => toggleDetails(index)} className='showmore-button'>
              {showDetails[index] ? 'Show Less <' : 'Show More >'}
            </button>
            {showDetails[index] && (
              <div className='blogbox-flex'>
                <section className='left-area'>
                  <h3>{blog.title}</h3>
                  <hr></hr>
                  Linkki: <a className='bloglink' href={blog.url}>{blog.url}</a> <br />
                  <br />
                  <span className='authorname'>
                    by {blog.author}
                  </span>
                  <br/><br/>                
                  <section>
                    {blog.comments.map((comment) => (
                      <article key={comment._id["$oid"]}>
                        {comment.anonymous ? 'Comment: ' : ''}
                        {comment.content}
                      </article>
                    ))}
                  </section>
                </section>
                <article className='right-area'>
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis blanditiis 
                    necessitatibus nesciunt corporis, maxime nulla dignissimos, repellat quae distinctio ea 
                    voluptate eum modi cupiditate dolorum totam molestias velit consequuntur ratione?
                  </div>
                  <br></br>
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis blanditiis 
                    necessitatibus nesciunt corporis, maxime nulla dignissimos, repellat quae distinctio ea 
                    voluptate eum modi cupiditate dolorum totam molestias velit consequuntur ratione?
                  </div>
                  <br></br>
                  Likes: {blog.likes} <br/>
                  <button onClick={() => handleLikeClick(blog.id)} className='like-button'>
                    I Like this!
                  </button>
                  <button onClick={() => handleDeleteClick(blog.id)} className='delete-button'>
                    Delete this Blog!
                  </button> 
                  <hr />
                  <input className='comment-input'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder='Enter your comment...'
                  /><br></br>
                  <button onClick={() => handleAddComment(blog.id)} className='add-comment-button'>
                    Add a Comment
                  </button>
                </article>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserBlogs;
