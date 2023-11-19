// actions/anecdoteActions.js
import { vote } from '../reducers/anecdoteSlice'; // Adjust the path accordingly
import axios from 'axios';

export const voteAsync = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:3001/anecdotes/${id}/votes`);
    dispatch(vote(response.data)); // Dispatch the 'vote' action with the updated data
  } catch (error) {
    console.error('Error updating vote:', error);
  }
};
