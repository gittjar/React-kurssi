import React, { useEffect } from 'react';

const Notification = ({ type, message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        onClose(); // Call the onClose function to update the state and hide the notification
      }, 5000);

      return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
    }
  }, [message, onClose]);

  if (!message) return null;

  const style = {
    border: 'solid',
    padding: 10,
    width: 320,
    borderWidth: 1,
    marginBottom: 5,
    color: type === 'success' ? 'green' : 'red',
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
};

export default Notification;
