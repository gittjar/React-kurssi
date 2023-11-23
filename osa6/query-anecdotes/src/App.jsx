// @refresh ignore
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import './styles.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import { deleteAnecdote } from './requests';


const OfflineMessage = () => {
  return (
    <div className="offline-message">
      Anecdote service is currently unavailable due to server issues. Please try again later.
    </div>
  );
};

const App = () => {
  const queryClient = useQueryClient();

  const handleVotePlus = async (anecdote) => {
    try {
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

      await updateAnecdote(updatedAnecdote);

      // Optionally, you can refetch the anecdotes to update the UI
      queryClient.invalidateQueries('anecdotes');
    } catch (error) {
      console.error('Error updating anecdote:', error);
    }
  };

  const handleVoteMinus = async (anecdote) => {
    try {
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes - 1 };

      await updateAnecdote(updatedAnecdote);

      // Optionally, you can refetch the anecdotes to update the UI
      queryClient.invalidateQueries('anecdotes');
    } catch (error) {
      console.error('Error updating anecdote:', error);
    }
  };




  const handleDelete = async (id) => {
    try {
      await deleteAnecdote(id);

      // Optionally, you can refetch the anecdotes to update the UI
      queryClient.invalidateQueries('anecdotes');
    } catch (error) {
      console.error('Error deleting anecdote:', error);
    }
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    onError: (error) => {
      console.error('Error fetching anecdotes:', error);
    },
  });

  const isOffline = result.error || result.isLoading;

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h2>Anecdote app</h2>

      <Notification />

      {isOffline ? (
        <OfflineMessage />
      ) : (
        <>
          <AnecdoteForm />

          {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
              <article className='anecdote-content'>
                <div>{anecdote.content}</div>
                <hr />
                <div>
                  has {anecdote.votes} votes! <br />
                  <button onClick={() => handleVotePlus(anecdote)}>Vote +1</button>
                  <button onClick={() => handleVoteMinus(anecdote)}>Vote -1</button>

                  <button className='delete-button' onClick={() => handleDelete(anecdote.id)}>Delete</button>

                </div>
              </article>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
