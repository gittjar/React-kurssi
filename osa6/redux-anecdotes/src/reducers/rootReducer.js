// rootReducer.js
import { combineReducers } from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
});

export const selectFilteredAnecdotes = (state) => {
  const filter = state.filter.toLowerCase();
  return state.anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter)
  );
};

export default rootReducer;
