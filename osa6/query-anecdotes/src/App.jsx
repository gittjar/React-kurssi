// @refresh ignore
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import './styles.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes } from './requests';

const OfflineMessage = () => {
  return (
    <div className="offline-message">
      Anecdote service is currently unavailable due to server issues. Please try again later.
    </div>
  );
};

const App = () => {
  const queryClient = useQueryClient();

  const handleVote = (anecdote) => {
    console.log('vote');
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
      <h3>Anecdote app</h3>

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
              <hr/>
              <div>
                has {anecdote.votes} votes! <br/>
                <button onClick={() => handleVote(anecdote)}>vote</button>
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
