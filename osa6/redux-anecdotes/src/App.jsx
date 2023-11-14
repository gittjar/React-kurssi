import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import rootReducer, { getFilteredAnecdotes } from './reducers/rootReducer';
// import VisibilityFilter from './components/VisibilityFilter';
import './styles.css';

// Create the Redux store
const store = createStore(rootReducer);

const App = () => {
  // Use useSelector to get the state from the Redux store
  const filteredAnecdotes = useSelector(getFilteredAnecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch({ type: 'VOTE', data: { id } });
  };

  const zero = () => {
    dispatch({ type: 'ZERO' });
  };

  return (
    <div>
      <h2>Anecdotes - Anecdote Web App</h2>
      <button onClick={zero}>Reset all</button>
      <hr />
     
     
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id} className="anecdote-content">
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>Vote</button>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default App;
