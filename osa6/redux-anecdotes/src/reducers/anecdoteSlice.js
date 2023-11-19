// reducers/anecdoteSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getId = () => (100000 * Math.random()).toFixed(0);

export const createAnecdoteAsync = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content) => {
    const response = await axios.post('http://localhost:3001/anecdotes', { content, votes: 0, id: getId() });
    return response.data;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAnecdoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAnecdoteAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(createAnecdoteAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default anecdoteSlice.reducer;
