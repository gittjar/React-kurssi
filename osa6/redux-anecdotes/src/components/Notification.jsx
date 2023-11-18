import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const style = {
    border: 'dashed',
    padding: 10,
    borderWidth: 2,
    display: notification ? 'block' : 'none',
  };

  // Function to clear the notification after a delay
  const clearNotificationWithDelay = () => {
    setTimeout(() => {
      dispatch(clearNotification());
    }, 10000); 
  };

  // When the component renders, set a timeout to clear the notification
  if (notification) {
    clearNotificationWithDelay();
  }

  return <div style={style}>{notification}</div>;
};

export default Notification;
