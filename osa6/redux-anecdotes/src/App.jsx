import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './reducers/filterReducer';
import {
  resetAnecdotes,
  appendAnecdote,
} from './reducers/anecdoteReducer';
import { selectFilteredAnecdotes } from './reducers/rootReducer';
import Notification from './components/Notification';
import { voteAsync } from './reducers/anecdoteActions';

const App = () => {
  const filteredAnecdotes = useSelector(selectFilteredAnecdotes);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('http://localhost:3001/anecdotes');
        console.log('Response:', response);

        if (!response.ok) {
          const error = new Error('Failed to fetch data');
          console.error('Error fetching data:', error);
          throw error;
        }

        const data = await response.json();
        console.log('Data:', data);

        // Convert the data object into an array
        const anecdotesArray = Object.values(data);

        // Dispatch appendAnecdote for each individual anecdote
        anecdotesArray.forEach((anecdote) => dispatch(appendAnecdote(anecdote)));

        // Set loading to false and clear error after fetching data
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Update the local state whenever filteredAnecdotes changes
    if (!loading) {
      setLoading(true);
      fetchData();
    }
  }, [filteredAnecdotes]);

  const handleVote = (id) => {
    dispatch(voteAsync(id));
  };

  const handleReset = () => {
    dispatch(resetAnecdotes());
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    dispatch(setFilter({ filter }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      
      <h2>Anecdotes - Anecdote Web App</h2>
      
      <div>
        <div>Filter:</div>
        <input type="text" onChange={handleFilterChange} />
      </div>
      
      <button onClick={handleReset}>Reset all</button>
      <hr />
      <Notification />

      <hr />
      {filteredAnecdotes && filteredAnecdotes.length > 0 ? (
        filteredAnecdotes.map((anecdote) => (
          <div key={anecdote.id} className="anecdote-content">
            <div className="anecdote-id">id:{anecdote.id}</div>
            <hr />
            <div>{anecdote.content}</div>
            <div>
              <p>has {anecdote.votes} votes!</p>
              <button onClick={() => handleVote(anecdote.id)}>Vote</button>
            </div>
            <br />
          </div>
        ))
      ) : (
        <p>No anecdotes found.</p>
      )}
    </div>
  );
};

export default App;
