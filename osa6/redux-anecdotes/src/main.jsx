import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import anecdoteReducer from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';  // Import the AnecdoteForm component


const store = createStore(anecdoteReducer);

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <div>
      <App />
      <div>Jarno K. 11/2023</div>
      <AnecdoteForm />  {/* Include the AnecdoteForm component */}
    </div>
  </Provider>
);
