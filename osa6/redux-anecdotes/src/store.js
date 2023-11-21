// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer: {
    anecdotes: rootReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
});

export default store;
