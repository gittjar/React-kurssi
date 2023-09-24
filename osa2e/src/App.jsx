import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import Weather from './Weather'; // Import the Weather component

const App = () => {
  const [countryData, setCountryData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    // Make the initial API request when the component mounts
    axios
      .get('https://restcountries.com/v2/all') // Updated API URL
      .then(function (response) {
        // handle success
        setCountryData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    // Filter the data based on the search term after at least two letters
    if (searchTerm.length >= 2) {
      const filteredCountries = countryData.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filteredCountries);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, countryData]);

  return (
    <div className='main'>
      <h2>Country Information App</h2>
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm.length >= 2 ? (
        <div>
          {filteredData.map((country) => (
            <div key={country.alpha3Code}>
              <h3>{country.name}</h3>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <figure>
              <img src={country.flag} className='maalippu' alt={`Flag of ${country.name}`} />
            </figure>
            <Weather capital={country.capital} />
            </div>
          ))}
        </div>
      ) : (
        <p>Hae maita kirjoittamalla ..</p>
      )}
    </div>
  );
};

export default App;
