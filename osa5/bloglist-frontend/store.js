// store.js
import { createStore, combineReducers } from 'redux';
import blogReducer from './src/reducers/blogReducer';
import notificationReducer from './src/reducers/notificationReducer';

const rootReducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  // Add other reducers if needed
});

const store = createStore(rootReducer);

export default store;
