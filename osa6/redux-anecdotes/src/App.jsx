import { useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer';

const store = createStore(anecdoteReducer);

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch(); // Get dispatch function from React-Redux

  const vote = (id) => {
    console.log('vote', id);
    dispatch({ type: 'VOTE', data: { id } }); // Use dispatch from React-Redux
  };

  const zero = () => {
    dispatch({ type: 'ZERO' }); // Use dispatch from React-Redux
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <button onClick={zero}>Reset all</button>
      <hr />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
          
        </div>
       
      ))}
      <h2>create new</h2>
      <form>
        <div>
          <input />
        </div>
        <button onClick={zero}>create</button>
      </form>
    </div>
  );
};

export default App;
