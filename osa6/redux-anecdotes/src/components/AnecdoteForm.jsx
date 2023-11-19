import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdoteAsync } from '../reducers/anecdoteSlice';
import { setNotification } from '../reducers/notificationReducer';



const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

// components/AnecdoteForm.jsx
const handleCreateAnecdote = async () => {
  try {
    event.preventDefault(); // Prevent the default form submission behavior
    await dispatch(createAnecdoteAsync(content));
    setContent(''); // Clear the input after creating an anecdote
    dispatch(setNotification('New anecdote created!'));
  } catch (error) {
    // Handle the error and show a notification
    dispatch(setNotification(`Failed to create anecdote: ${error.message}`));
  }
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

