// notificationReducer.js
const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data;
      case 'CLEAR_NOTIFICATION':
        return null;
      default:
        return state;
    }
  };
  
  export const setNotification = (notification) => {
    return {
      type: 'SET_NOTIFICATION',
      data: notification,
    };
  };
  
  export const clearNotification = () => {
    return {
      type: 'CLEAR_NOTIFICATION',
    };
  };
  
  export default notificationReducer;
  