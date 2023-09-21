import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', puhelin: '040-123456' },
    { name: 'Ada Lovelace', puhelin: '39-44-5323523' },
    { name: 'Dan Abramov', puhelin: '12-43-234345' },
    { name: 'Mary Poppendieck', puhelin: '39-23-6423122' },
    { name: 'Terminator "T-1000"', puhelin: '555-441000123' },
    { name: 'Jack Sparrow', puhelin: '041-9996660' },
  ]);

  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredList, setFilteredList] = useState(persons);

  const addName = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      setErrorMessage(`'${newName}' is already in the list.`);
    } else {
      const newPerson = { name: newName, puhelin: newPhoneNumber };
      setPersons([...persons, newPerson]);
      setNewName('');
      setNewPhoneNumber('');
      setErrorMessage('');
      // Update filtered list with the new data
      setFilteredList([...filteredList, newPerson]);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    const searchText = event.target.value;
    setFilterText(searchText);
    // Update filtered list based on the search text
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter phonebook: <br />
        <input value={filterText} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addName}>
        <div>
          Name: <br />
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <br />
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filteredList.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.puhelin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
