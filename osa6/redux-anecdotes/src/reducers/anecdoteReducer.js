const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Ei tippa tapa ja ämpäriin ei huku..!',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);

      if (anecdoteToVote) {
        // Create a new array with the voted anecdote replaced
        return state.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 } // Correct usage of spread operator
            : anecdote
        );
      }
      // Return the current state if the anecdote is not found
      return state;

    case 'NEW_ANECDOTE':
      const newAnecdote = action.data; 
      return [...state, newAnecdote]; 

    case 'ZERO':
      return initialState;

    default:
      return state;
  }
};

export default reducer