import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = '7036cc1503804fb8ade110135233103';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, [capital]);

  return (
    <div>
      <h4>Weather in {capital}</h4>
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon}/>
         
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
