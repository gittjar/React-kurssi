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
                <a href={blog.url}>{blog.url}</a> <br />
                likes: {blog.likes} <br />
                by {blog.author}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserBlogs;
