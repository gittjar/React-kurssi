import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import './styles.css';
import numberService from './services/numberService';
import Notification from './components/Notification';
import ConfirmationDialog from './components/ConfirmationDialog';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [personToUpdate, setPersonToUpdate] = useState(null); // Track the person being updated
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] = useState(false);
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState('');
  const [personToDelete, setPersonToDelete] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 10000);
  };

  useEffect(() => {
    numberService.getAll().then((data) => {
      setPersons(data);
      setFilteredList(data);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      setPersonToUpdate(existingPerson);
      setConfirmationMessage(`${newName} is already in the list. Do you want to update the information?`);
      setShowConfirmationDialog(true);
    } else {
      const newPerson = { name: newName, puhelin: newPhoneNumber };
      numberService.create(newPerson)
        .then((response) => {
          setPersons([...persons, response]);
          setNewName('');
          setNewPhoneNumber('');
          setErrorMessage('');
          setFilteredList([...filteredList, response]);
          showNotification(`${newName} added to the list.`);
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    }
  };

  const handleConfirm = () => {
    setShowConfirmationDialog(false);
    if (personToUpdate) {
      const updatedPerson = { ...personToUpdate, puhelin: newPhoneNumber };
      numberService
        .put(personToUpdate.id, updatedPerson)
        .then((response) => {
          setPersons(persons.map((person) => (person.id === response.id ? response : person)));
          setFilteredList(filteredList.map((person) => (person.id === response.id ? response : person)));
          setNewName('');
          setNewPhoneNumber('');
          setErrorMessage('');
          setPersonToUpdate(null);
          showNotification(`${newName} updated in the list.`);
        })
        .catch((error) => {
          console.error('Error updating data:', error);
        });
    }
  };

  const handleCancel = () => {
    setShowConfirmationDialog(false);
    setPersonToUpdate(null);
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
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);

    if (person) {
      setPersonToDelete(person);
      setDeleteConfirmationMessage(`Do you really want to delete ${person.name}?`);
      setShowDeleteConfirmationDialog(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (personToDelete) {
      numberService.deleteId(personToDelete.id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personToDelete.id));
          setFilteredList(filteredList.filter((person) => person.id !== personToDelete.id));
          setPersonToDelete(null);
          showNotification(`${personToDelete.name} deleted from the list.`);
        })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
    }

    setShowDeleteConfirmationDialog(false);
  };

  const handleDeleteCancel = () => {
    setPersonToDelete(null);
    setShowDeleteConfirmationDialog(false);
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
      <Notification message={notification} />

      {showConfirmationDialog && (
        <ConfirmationDialog
          message={confirmationMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

{showDeleteConfirmationDialog && (
        <ConfirmationDialog
          message={deleteConfirmationMessage}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      {errorMessage && <div className="error">{errorMessage}</div>}
      <div className="filtered-list">
        <Persons filteredList={filteredList} handleDelete={handleDelete}/>
      </div>
    </div>
  );
};

export default App;
