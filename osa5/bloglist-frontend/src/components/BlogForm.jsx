import React from 'react';

const BlogForm = ({ newBlog, handleBlogChange, addBlog }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        Title<br/>
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        Author<br/>
        <input
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        URL<br/>
        <input
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </div>
      <div>
        LIKES<br/>
        <input
          type="number"
          name="likes"
          value={newBlog.likes}
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default BlogForm;
