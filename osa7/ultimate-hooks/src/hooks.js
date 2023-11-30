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

  

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const get = async () => {
    try {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  

  const create = async (resource) => {
    try {
      await axios.post(baseUrl, resource);
      // After creating, fetch the updated data
      await get();
    } catch (error) {
      console.error('Error creating resource:', error.message);
      console.log('Response from server:', error.response.data);
    }
  };

  useEffect(() => {
    get();
  }, [baseUrl]);

  const service = {
    get,
    create,
  };

  return [resources, service];
};
