import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    // When the notification changes, set a timeout to clear it after a delay
    console.log('Notification:', notification); 

    if (notification) {
      const timeoutId = setTimeout(() => {
        dispatch(clearNotification());
      }, 10000);

      // Clear the timeout when the component unmounts or the notification changes
      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, notification]);

  const style = {
    border: 'dashed',
    padding: 10,
    borderWidth: 2,
    display: notification ? 'block' : 'none',
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
