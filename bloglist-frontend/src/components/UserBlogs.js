import React, { useState, useEffect } from 'react';

function UserBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [error, setError] = useState(null);

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
        'Authorization': token,
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

  return (
    <div>
      <h2>User's Blogs</h2>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url}>{blog.title}</a> by {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserBlogs;
