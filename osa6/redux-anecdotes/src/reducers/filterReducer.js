// filterReducer.js
const filterReducer = (state = '', action) => {
    console.log('ACTION: ', action)
    switch (action.type) {
      case 'SET_FILTER':

        return action.data.filter;
      default:
        return state;
    }
  };
  
  export const setFilter = (filter) => {
    console.log('ACTION: ', filter)
    return {
      type: 'SET_FILTER',
      data: { filter: String(filter) }, // Ensure the filter is a string
    };
  };

  export const getFilteredAnecdotes = (state) => {
    const filter = state.filter.toLowerCase(); // Convert to lowercase for case-insensitive matching
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter)
    );
  };
  
  export default filterReducer;
  