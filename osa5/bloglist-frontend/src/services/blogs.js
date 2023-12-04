import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
 // token = `${newToken}`
 token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdvZCIsImlkIjoiNjUzZTVjN2MxYWZhZTU2YjcwNmQyZDk0IiwiaWF0IjoxNjk4Nzc4NTE2fQ.NgBb-LbO7TX6gLGXVT8_EG-Er9IufueRUsJjKcpulcA'
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then(response => response.data);
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = async (id, newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };

    // Assuming that your server supports updating likes via a PUT request
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);

    if (response.ok) {
      // If the server responds with the updated blog object,
      // you can extract the updated likes count from the response
      const updatedBlog = response.data;
      const updatedBlogs = userBlogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );

      setUserBlogs(updatedBlogs);
    } else {
      throw new Error('Failed to update blog');
    }
  } catch (error) {
    console.error('Error updating blog:', error);
    // Handle the error as needed
  }
};

export default { 
  getAll, create, update, setToken
};

