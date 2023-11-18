// rootReducer.js
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
