import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather, Visibility } from './types';
import DiaryEntryComponent from './DiaryEntry';
import './styles.css';

const App: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const response = await axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries');
      setDiaryEntries(response.data);
    };

    fetchDiaryEntries();
  }, []);

  const addEntry = async () => {
    try {
      const response = await axios.post<DiaryEntry>('http://localhost:3001/api/diaries', newEntry);
      setDiaryEntries([...diaryEntries, response.data]);
      setNewEntry({ date: '', weather: Weather.Sunny, visibility: Visibility.Great, comment: '' });
      setErrorMessage(null); // clear any previous error message
    } catch (error) {
      // If the error response has a message, use it, otherwise use a default message
      setErrorMessage(error.response?.data?.message || 'An error occurred while adding the entry');
    }
  };

  return (
    <div>
      
        {errorMessage && <article className='error-message'>Error: {errorMessage}</article>}
      
      <h1>My Flight Diary</h1>
      <div>
        <input
          value={newEntry.date}
          onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
          placeholder="Date"
        /><br/>
        <select
          value={newEntry.weather}
          onChange={e => setNewEntry({ ...newEntry, weather: e.target.value as Weather })}
        >
          {Object.values(Weather).map(weather => (
            <option key={weather} value={weather}>
              {weather}
            </option>
          ))}
        </select><br/>
        <select
          value={newEntry.visibility}
          onChange={e => setNewEntry({ ...newEntry, visibility: e.target.value as Visibility })}
        >
          {Object.values(Visibility).map(visibility => (
            <option key={visibility} value={visibility}>
              {visibility}
            </option>
          ))}
        </select><br/>
        <textarea
          value={newEntry.comment}
          onChange={e => setNewEntry({ ...newEntry, comment: e.target.value })}
          placeholder="Comment"
        /><br/>
        <button onClick={addEntry}>Add entry</button>
      </div>
      {diaryEntries.map(entry => (
        <DiaryEntryComponent key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default App;