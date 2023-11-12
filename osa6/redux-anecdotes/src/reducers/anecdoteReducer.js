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
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);

      if (anecdoteToVote) {
        // Luodaan uusi taulukko, jossa äänestetty anekdootti on korvattu
        const updatedState = state.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        );

        // Järjestä taulukko äänimäärän mukaan suurimmasta pienimpään
        return updatedState.sort((a, b) => b.votes - a.votes);
      }

      // Palauta nykyinen tila, jos anekdoottia ei löydy
      return state;

    case 'NEW_ANECDOTE':
      const newAnecdote = action.data;
      // Lisää uusi anekdootti ja järjestä taulukko äänimäärän mukaan
      return [...state, newAnecdote].sort((a, b) => b.votes - a.votes);

    case 'ZERO':
      return initialState;

    default:
      return state;
  }
};


export default reducer