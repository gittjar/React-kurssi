// rootReducer.js
import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

export const getFilteredAnecdotes = (state) => {
  const filter = state.filter;
  const anecdotes = state.anecdotes;

  if (!filter) {
    return anecdotes;
  }

  return anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export default rootReducer;
