// rootReducer.js
/*
import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';
import notificationReducer from '../reducers/notificationReducer';

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

export const selectFilteredAnecdotes = (state) => {
  const anecdotes = state.anecdotes;
  const filter = state.filter;

  return anecdotes.filter((anecdote) => {
    // Check if anecdote.content is defined before calling toLowerCase()
    return anecdote.content && anecdote.content.toLowerCase().includes(filter);
  });
};

export default rootReducer;
*/
// rootReducer.js
// rootReducer.js
import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer'; // adjust the path accordingly
import filterReducer from './filterReducer'; // adjust the path accordingly
import { createSelector } from '@reduxjs/toolkit';

// Assuming you have a slice named 'anecdotes' in your rootReducer
export const selectAnecdotes = (state) => state.anecdotes;

export const selectFilteredAnecdotes = createSelector(
  [selectAnecdotes, (state) => state.filter], // adjust these selectors based on your state structure
  (anecdotes, filter) => {
    // Implement your filtering logic here
    return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
  }
);

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  // Add other reducers if any
});

export default rootReducer;
