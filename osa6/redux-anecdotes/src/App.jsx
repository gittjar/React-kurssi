import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer';
import { Provider } from 'react-redux';
import './styles.css'; 


const store = createStore(anecdoteReducer);
const getId = () => (100000 * Math.random()).toFixed(0);


const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  // Add state for the new anecdote content
  const [newAnecdoteContent, setNewAnecdoteContent] = useState('');

  const vote = (id) => {
    console.log('vote', id);
    dispatch({ type: 'VOTE', data: { id } });
  };

  const zero = () => {
    dispatch({ type: 'ZERO' });
  };

  const createNewAnecdote = () => {
    const newAnecdote = {
      content: newAnecdoteContent, // content of new anecdote
      id: getId(),
      votes: 0,
    };
  
    dispatch({ type: 'NEW_ANECDOTE', data: newAnecdote });
  };


  return (
    <div>
      <h2>Anecdotes</h2>
      <button onClick={zero}>Reset all</button>
      <hr />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id} className='anecdote-content'>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
          <br />
          
        </div>
        
      ))}
            <hr />
      <h2>create new</h2>
      <form>
        <div>
          <input
            type="text"
            onChange={(e) => setNewAnecdoteContent(e.target.value)}
            value={newAnecdoteContent}
          />
        </div>
        <button type="button" onClick={createNewAnecdote}>
          create
        </button>
      </form>
    </div>
  );
};

export default App;
