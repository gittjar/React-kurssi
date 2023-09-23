import React from 'react';

const Persons = ({ filteredList, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filteredList.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.puhelin}</td>
              <td>
                <button className='deletebutton' onClick={() => handleDelete(person.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Persons;
