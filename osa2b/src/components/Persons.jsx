import React from 'react';

const Persons = ({ filteredList }) => {
  return (
    <div>
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

export default Persons;
