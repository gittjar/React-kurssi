import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer';
import { Provider } from 'react-redux';
import './styles.css';

const store = createStore(anecdoteReducer);

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch({ type: 'VOTE', data: { id } });
  };

  const zero = () => {
    dispatch({ type: 'ZERO' });
  };

  return (
    <Provider store={store}>
      <div>
        <h2>Anecdotes - Anecdote Web App</h2>
        <button onClick={zero}>Reset all</button>
        <hr />
        {anecdotes.map((anecdote) => (
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
    </Provider>
  );
};

export default App;
