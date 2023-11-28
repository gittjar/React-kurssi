import { useState } from 'react';
import { useMatch } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Menu from './components/Menu';
import './styles.css';
import { useField } from './hooks/hooks';




const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Today's great anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    };

    addNew(newAnecdote);

    // Show notification for 5 seconds
    setNotification('New anecdote created!');

    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification('');
    }, 5000);

    // Clear form fields
    content.clear();
    author.clear();
    info.clear();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content<br />
          <input {...content} />
        </div>
        <div>
          author<br />
          <input {...author} />
        </div>
        <div>
          url for more info<br />
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={() => { content.clear(); author.clear(); info.clear(); }}>
          reset
        </button>
      </form>
    </div>
  );
};



const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };
  const AnecdoteDetail = () => {
    const match = useMatch('/anecdotes/:id');
    const anecdoteId = match ? Number(match.params.id) : null;
    const anecdote = anecdoteId ? anecdotes.find(anecdote => anecdote.id === anecdoteId) : null;
  
    if (!anecdote) {
      return <div>Anecdote not found</div>;
    }
  
    return (
      <div className='anecdote-content'>
        <h2>Anecdote Details</h2>
        <p>Anecdote content: {anecdote.content}</p>
        <p>Author: {anecdote.author}</p>
        <p>Info: {anecdote.info}</p>
        <p>Votes: {anecdote.votes}</p>
        <a href="/anecdotes">Back to Anecdotes</a>
      </div>
    );
  };

  return (
    <div className='main'>

    <Router>
           {/* Display notification */}
           {notification && (
          <div className="notification">
            {notification}
          </div>
        )}
        <h1>Software anecdotes</h1>
        <Menu />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createnew" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
          <Route path="/about" element={<About />} />
          <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route
            path="/anecdotes/:id"
            element={<AnecdoteDetail />}
          />
        </Routes>

            <footer>
        <Footer />
            </footer>
    </Router>
    </div>
  );
};

export default App;
