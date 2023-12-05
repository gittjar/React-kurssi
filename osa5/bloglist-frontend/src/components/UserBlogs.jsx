import React, { useState, useEffect } from 'react';

function UserBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState([]); // Initialize state for each blog

  useEffect(() => {
    // Fetch the user's blogs after successful login
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle the case where the user is not authenticated
      setError('Authentication required');
      return;
    }

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`, // Add Authorization token
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
  
      const response = await fetch(`http://localhost:3003/api/blogs/${blogId}/like`, requestOptions);
  
      if (response.ok) {
        // Assuming that the server responds with the updated blog object
        const updatedBlog = await response.json();
  
        // Update the UI to reflect the new likes count
        const updatedBlogs = userBlogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        );
  
        setUserBlogs(updatedBlogs);
      } else {
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
  
  



  return (
    <div>
      <h2>User's Blogs</h2>
      <div>
        {userBlogs.map((blog, index) => (
          
          <div key={blog.id} className='blogibox'>
             
            {blog.title}<br/>
            <button onClick={() => toggleDetails(index)} className='showmore-button'>
              {showDetails[index] ? 'Show Less' : 'Show More'}
            </button>
           
            {showDetails[index] && (
              <div>
                <hr></hr>
                Linkki: <a className='bloglink' href={blog.url}>{blog.url}</a> <br />
                <hr></hr>
                Likes: {blog.likes} <br/>
                <button onClick={() => handleLikeClick(blog.id)} className='like-button'>
                Like
              </button><br />
                by {blog.author}
                <br/><br/>
                <span className='username'>User: 
                {blog.user.name} </span>
                <br/><br/>
                <button onClick={() => handleDeleteClick(blog.id)} className='delete-button'>
                  Delete this Blog !
                </button> 
               

 
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserBlogs;
