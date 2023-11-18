import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from './reducers/filterReducer';
import { vote, resetAnecdotes, appendAnecdote } from './reducers/anecdoteReducer';
import { selectFilteredAnecdotes } from './reducers/rootReducer';
import Notification from './components/Notification'; // Import the Notification component

const App = () => {
  const filteredAnecdotes = useSelector(selectFilteredAnecdotes);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('http://localhost:3001/anecdotes');
        console.log('Response:', response);
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        console.log('Data:', data);
  
        // Dispatch appendAnecdote for each individual anecdote
        data.forEach(anecdote => dispatch(appendAnecdote(anecdote)));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally, dispatch an action to set an error message in your state
        // dispatch(setErrorMessage('Failed to fetch anecdotes'));
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
