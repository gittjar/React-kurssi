// store.js
import { createStore, combineReducers } from 'redux';
import blogReducer from './src/reducers/blogReducer';

const rootReducer = combineReducers({
  blogs: blogReducer,
  // Add other reducers if needed
});

const store = createStore(rootReducer);

export default store;
