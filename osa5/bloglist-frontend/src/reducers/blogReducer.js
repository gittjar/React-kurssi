// blogReducer.js
const blogReducer = (state = [], action) => {
    switch (action.type) {
      case 'CREATE_BLOG':
        return [...state, action.payload]; // Add the new blog to the state
      // Handle other cases if needed
      default:
        return state;
    }
  };
  
  export default blogReducer;
  