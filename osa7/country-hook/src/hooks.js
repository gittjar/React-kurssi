// hooks.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
    const [country, setCountry] = useState(null);
  
    useEffect(() => {
      if (name) {
        axios
          .get(`https://restcountries.com/v2/name/${name}`)
          .then((response) => {
            // Check if the response contains data
            if (response.data.length > 0) {
              setCountry({ data: response.data[0], found: true });
            } else {
              // If no data is found, set found to false
              setCountry({ found: false });
            }
          })
          .catch((error) => {
            // Handle errors
            if (error.response && error.response.status === 404) {
              // Set found to false if 404 (Not Found) status code
              setCountry({ found: false });
            } else {
              // Handle other errors
              console.error('Error:', error);
            }
          });
      }
    }, [name]);
  
    return country;
  };
  