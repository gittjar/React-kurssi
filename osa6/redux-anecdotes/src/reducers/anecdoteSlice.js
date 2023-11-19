// reducers/anecdoteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getId = () => (100000 * Math.random()).toFixed(0);

export const createAnecdoteAsync = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/anecdotes', { content, votes: 0, id: getId() });
      return response.data;
    } catch (error) {
      // Use rejectWithValue to pass the error message to the action payload
      return rejectWithValue(error.message);
    }
  }
);


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {
    vote: (state, action) => {
      const id = action.payload.id;
      const anecdoteToVote = state.data.find((anecdote) => anecdote.id === id);

      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    createAnecdote: (state, action) => {
      state.data.push(action.payload);
    },
    resetAnecdotes: () => ({ data: [], status: 'idle', error: null }),
    appendAnecdote: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { vote, createAnecdote, appendAnecdote, resetAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
