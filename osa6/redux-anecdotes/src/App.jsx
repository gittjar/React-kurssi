import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './reducers/filterReducer';
import { vote, resetAnecdotes, initializeAnecdotes } from './reducers/anecdoteReducer';
import { selectFilteredAnecdotes } from './reducers/rootReducer';
import Notification from './components/Notification'; // Import the Notification component



const App = () => {
  const filteredAnecdotes = useSelector(selectFilteredAnecdotes);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch anecdotes from the JSON server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/anecdotes');
        const data = await response.json();
        dispatch(initializeAnecdotes(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

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
      <Notification/>

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
