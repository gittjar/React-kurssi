// rootReducer.js
import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';

// Define your selector function
export const selectFilteredAnecdotes = (state) => {
  const filter = state.filter;
  const anecdotes = state.anecdotes.data;

  if (!filter) {
    return anecdotes;
  }

  // Apply your filtering logic here
  return anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
};

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  // Add other reducers if any
});

export default rootReducer;
