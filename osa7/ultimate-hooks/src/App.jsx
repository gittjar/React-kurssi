// Import necessary dependencies and components
import { useState } from 'react';
import { useField, useResource } from './hooks';
import Notification from './Nofication';
import './styles.css';
import '@master/css';


// Define the main App component
const App = () => {
  // Define state variables and services
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');
  const [notification, setNotification] = useState(null);

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  // Function to create a resource and handle notifications
  const createResource = async (service, data, successMessage) => {
    try {
      await service.create(data);
      setNotification({ type: 'success', message: successMessage });
    } catch (error) {
      console.error(`Error creating resource: ${error.message}`);
      setNotification({ type: 'error', message: `Failed to create resource: ${error.message}` });
    }
  };

// Function to handle note creation
const handleNoteSubmit = (event) => {
  event.preventDefault();

  // Ensure content is not empty and has at least 5 characters
  if (!content.value || content.value.length < 5) {
    setNotification({ type: 'error', message: 'Too short! Give at least 5 characters long note!' });
    return;
  }

  createResource(noteService, { content: content.value }, 'New note created successfully');
  content.onChange({ target: { value: '' } });
};

// Function to handle person creation
const handlePersonSubmit = (event) => {
  event.preventDefault();

  // Ensure name and number are not empty
  if (!name.value || !number.value) {
    setNotification({ type: 'error', message: 'Name and number are required for creating a person' });
    return;
  }

  // Ensure name has at least 5 characters
  if (name.value.length < 5) {
    setNotification({ type: 'error', message: 'Name must have at least 5 characters' });
    return;
  }

  createResource(personService, { name: name.value, number: number.value }, 'New person created successfully');
  name.onChange({ target: { value: '' } });
  number.onChange({ target: { value: '' } });
};


  // JSX structure for rendering the component
  return (
  <div>
          <div className='header'>
          {/* Render Notification component */}
          <Notification type={notification?.type} message={notification?.message} onClose={() => setNotification(null)} />
          </div>
    <div className="main"> 

    <aside className='otsikko'>
      <h3 className="font:antialiased@dark f:purple-20 f:2rem text-shadow:0|8|2">Ultimate Hooks App!</h3>
      <h3 className="font:antialiased@dark f:purple-30 f:2rem text-shadow:0|6|2">Ultimate Hooks App!</h3>
      <h3 className="font:antialiased@dark f:purple-40 f:2rem text-shadow:0|4|2">Ultimate Hooks App!</h3>
      <h3 className="font:antialiased@dark f:purple-50 f:2rem text-shadow:0|2|2">Ultimate Hooks App!</h3>
      <h3 className="font:antialiased@dark f:purple-60 f:2rem text-shadow:0|0|2">Ultimate Hooks App!</h3>

    </aside>
   
<article className='notes'>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} /><br/>
        <button type="submit">create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}
</article>

<article className='persons'>
      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <br/><input {...name} /> <br />
        number <br/> <input {...number} />
        <br/>
        <button type="submit">create</button>
      </form>
      {persons.map((p) => (
        <p key={p.id} className='p:4 m:5 b:2|solid|green-40 box-shadow:1|3|gray-30'>
          Nimi: {p.name} <br />Puhelinnumero: {p.number}
        </p>
      ))}
</article>

    </div>
    </div>

 
  );
};

// Export the App component as the default export
export default App;
