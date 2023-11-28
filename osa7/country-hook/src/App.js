import React, { useState } from 'react';
import { useCountry, useField } from './hooks'; // Assuming your hooks file is in the same directory


const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return (
      <div>
        not found today ... !
      </div>
    );
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <div>region {country.data.region}</div>
      <hr/>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
     
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
     
    </div>
  );
};

export default App;