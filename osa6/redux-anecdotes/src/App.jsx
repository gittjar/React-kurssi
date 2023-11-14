// App.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './reducers/filterReducer';
import { getFilteredAnecdotes } from './reducers/rootReducer';

const App = () => {
  const filteredAnecdotes = useSelector(getFilteredAnecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch({ type: 'VOTE', data: { id } });
  };

  const zero = () => {
    dispatch({ type: 'ZERO' });
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    dispatch(setFilter({ filter }));
  };

  return (
    <div>
      <h2>Anecdotes - Anecdote Web App</h2>
      <div>
        <div>Filter:</div>
        <input type="text" onChange={handleFilterChange} />
      </div>
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
