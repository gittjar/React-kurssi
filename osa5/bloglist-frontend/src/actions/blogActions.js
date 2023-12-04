// blogActions.js
export const createBlog = (newBlog) => {
    return {
      type: 'CREATE_BLOG',
      payload: newBlog,
    };
  };
  