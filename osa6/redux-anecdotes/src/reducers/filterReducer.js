import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload.filter || ''; // Use action.payload.filter or fallback to an empty string
    },
    
  },
});

console.log(filterSlice);

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
