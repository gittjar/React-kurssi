import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdoteAsync } from '../reducers/anecdoteSlice';
import { setNotification } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleCreateAnecdote = () => {
    event.preventDefault(); // Prevent the default form submission behavior
    dispatch(createAnecdoteAsync(content));
    setContent(''); // Clear the input after creating an anecdote
    dispatch(setNotification('New anecdote created!'))
  };

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your anecdote..."
      />
      <button onClick={handleCreateAnecdote}>Create</button>
    </div>
  );
};

export default AnecdoteForm;

