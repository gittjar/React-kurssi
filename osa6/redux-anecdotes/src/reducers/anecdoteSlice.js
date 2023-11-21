import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getId = () => (100000 * Math.random()).toFixed(0);

export const createAnecdoteAsync = createAsyncThunk(
  'anecdotes/createAnecdote',
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/anecdotes', {
        content,
        votes: 0,
        id: getId(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAnecdotesAsync = createAsyncThunk(
  'anecdotes/fetchAnecdotes',
  async () => {
    try {
      const response = await axios.get('http://localhost:3001/anecdotes');
      return response.data;
    } catch (error) {
      console.error('Error fetching anecdotes:', error);
      throw error; // Rethrow the error to be caught by the async action
    }
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {
    vote: (state, action) => {
      const { id } = action.payload;
      const anecdoteToVote = state.data.find((anecdote) => anecdote.id === id);

      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    resetAnecdotes: (state) => {
      state.data = [];
      state.status = 'idle';
      state.error = null;
    },
    appendAnecdote: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnecdotesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnecdotesAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchAnecdotesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createAnecdoteAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAnecdoteAsync.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createAnecdoteAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { vote, resetAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
