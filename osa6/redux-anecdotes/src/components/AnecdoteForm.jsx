// AnecdoteForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const getId = () => (100000 * Math.random()).toFixed(0);

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [newAnecdoteContent, setNewAnecdoteContent] = useState('');

  const createNewAnecdote = () => {
    const newAnecdote = {
      content: newAnecdoteContent,
      id: getId(),
      votes: 0,
    };

    dispatch({ type: 'NEW_ANECDOTE', data: newAnecdote });
    // Clear the input field after creating a new anecdote
    setNewAnecdoteContent('');
  };

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form>
        <div>
          <input
            type="text"
            onChange={(e) => setNewAnecdoteContent(e.target.value)}
            value={newAnecdoteContent}
            placeholder="Enter your anecdote..."
          />
        </div>
        <button type="button" onClick={createNewAnecdote}>
          Create
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
