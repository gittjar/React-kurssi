import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    setPersons([...persons, newPerson]);
    setNewName('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!newName.trim()) {
      alert('Please Enter Name');
      return;
    }}




  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={checkTextInput}>add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
