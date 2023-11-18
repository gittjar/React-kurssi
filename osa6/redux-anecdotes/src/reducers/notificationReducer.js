// notificationReducer.js
import { createSlice } from '@reduxjs/toolkit';

// Set your default notification message here
const initialState = 'Hello, tervetuloa ohjelmaan'; 

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => initialState,
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
