import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import './styles.css';
import numberService from './services/numberService'; 

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    numberService.getAll().then((data) => {
      setPersons(data);
      setFilteredList(data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      setErrorMessage(`'${newName}' is already in the list.`);
    } else {
      const newPerson = { name: newName, puhelin: newPhoneNumber };
      
      // Use the create function from numberService to add the new person
      // Remember install Axios
      // npm i axios
      // Remember install and run JSON server
      // npm i -g json-server
      // json-server --watch db.json
      // http://localhost:3000/persons

      numberService.create(newPerson)
        .then((response) => {
          setPersons([...persons, response]);
          setNewName('');
          setNewPhoneNumber('');
          setErrorMessage('');
          setFilteredList([...filteredList, response]);
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
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

  const handleDelete = (id) => {
    if (window.confirm('Do you really want to delete this person?')) {
      numberService.deleteId(id)
        .then(() => {
          // Filter out the deleted person from both states
          setPersons(persons.filter((person) => person.id !== id));
          setFilteredList(filteredList.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
    }
  };

  return (
    <div className="main">
      <h2>Phonebook</h2>
      <div className="filter-text">
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      </div>
      <form className="inputform" onSubmit={addName}>
        <div>

       <br />
          <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
        </div>

        <div className="add-nappi">
          <button type="submit">Add +</button>
        </div>
      </form>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className="filtered-list">
      <Persons filteredList={filteredList} handleDelete={handleDelete}/>
      </div>
    </div>
  );
};

export default App;
