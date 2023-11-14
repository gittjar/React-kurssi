// index.js
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Footer from './components/Footer';
import rootReducer from './reducers/rootReducer'; // Update the import

const store = createStore(rootReducer);

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <div>
      <Filter />
      <App />
      <div>Jarno K. 11/2023</div>
      <AnecdoteForm />
      <Footer />
    </div>
  </Provider>
);
