import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../reducers/notificationReducer';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    console.log('Notification:', notification);

    if (notification) {
      const timeoutId = setTimeout(() => {
        dispatch(clearNotification());
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, notification]);

  const style = {
    border: 'dashed',
    padding: 10,
    borderWidth: 2,
  };
  

  return <div style={style}>{notification}</div>;
};

export default Notification;
