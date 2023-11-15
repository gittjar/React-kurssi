import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './reducers/filterReducer';
import { vote, resetAnecdotes } from './reducers/anecdoteReducer';
import { selectFilteredAnecdotes } from './reducers/rootReducer';

const App = () => {
  const filteredAnecdotes = useSelector(selectFilteredAnecdotes);
  const dispatch = useDispatch();

  const handleVote = (id) => {
    console.log('vote', id);
    dispatch(vote({ id }));
  };

  const handleReset = () => {
    dispatch(resetAnecdotes());
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
      <button onClick={handleReset}>Reset all</button>
      <hr />

      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id} className="anecdote-content">
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>Vote</button>
            </div>
            <br />
          </div>
        ))}
    </div>
  );
};

export default App;
