import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Päiviö Pyysalo', puhelin: '0500123123' }]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const [errorMessage, setErrorMessage] = useState('');


  const addName = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      setErrorMessage(`'${newName}' on jo listalla!`);
    } else {
      const newPerson = { name: newName, puhelin: newPhoneNumber };
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewPhoneNumber('');
      setErrorMessage('');
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
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
          name: <br />
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <br/>
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} /></div>

        <div>
          <button type="submit" onClick={checkTextInput}>add</button>
        </div>
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}

      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <table>
        {persons.map((person, index) => (
          <tr key={index}>{person.name} {person.puhelin}</tr>
        ))}
    </table>
    </div>
  );
};

export default App;
