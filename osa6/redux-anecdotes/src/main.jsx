// index.js
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
//import Filter from './components/Filter';
import AnecdoteForm from './components/AnecdoteForm';
import Footer from './components/Footer';
import './styles.css';
import VisibilityFilter from './components/VisibilityFilter';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <div>
      <VisibilityFilter/>
      <App />
      <div>Jarno K. 11/2023</div>
      <AnecdoteForm />
      <Footer />
    </div>
  </Provider>
);
