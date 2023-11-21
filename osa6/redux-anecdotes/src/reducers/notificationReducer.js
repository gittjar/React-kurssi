// notificationReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Hello, tervetuloa ohjelmaan'; 

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
