import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdoteAsync } from '../reducers/anecdoteSlice';
import { setNotification, clearNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleCreateAnecdote = async () => {
    if (content.length < 5) {
      // Show a notification if the anecdote is less than 5 characters
      dispatch(setNotification(`Anecdote must be at least 5 characters long.`));
      return; // Prevent further processing if the anecdote is too short
    }
    
    try {
      event.preventDefault();
      await dispatch(createAnecdoteAsync(content));
      setContent('');
  
      // Dispatch a notification when a new anecdote is created
      dispatch(setNotification(`New anecdote created: '${content}'`));
  
      // Clear the notification after 5000 milliseconds (5 seconds)
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
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
