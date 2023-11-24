import React, { useState } from 'react';
import Notification from './Notification'; // Import your Notification component

const AnecdoteForm = () => {
  const [notification, setNotification] = useState(null);

  const randomId = Math.floor(Math.random() * 90000) + 10000;

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    try {
      if (!content || content.length < 5) {
        throw new Error('Too short! Give at least 5 characters long anecdote!');
      }

      const response = await fetch('http://localhost:3001/anecdotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          votes: 0,
          id: randomId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create anecdote');
      }

      setNotification({ type: 'success', message: 'New anecdote created successfully' });

      // You might want to trigger a refetch of your anecdotes here

      event.target.anecdote.value = ''; // Clear the input field after submission
    } catch (error) {
      console.error('Error creating anecdote:', error.message);
      setNotification({ type: 'error', message: error.message });
      // Handle error, show a notification, etc.
    }
  };

  return (
    <div>
      <h3>Create New Anecdote</h3>
      <form className='anecdote-form' onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>Create</button>
      </form>
      <Notification
        type={notification?.type}
        message={notification?.message}
        onClose={() => setNotification(null)}
      />
    </div>
  );
};

export default AnecdoteForm;
