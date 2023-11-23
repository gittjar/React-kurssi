import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  const anecdotes = response.data;

  // Sort anecdotes by votes in descending order
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  return sortedAnecdotes;
};

export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data);

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data);

export const deleteAnecdote = id =>
  axios.delete(`${baseUrl}/${id}`).then(res => res.data);
