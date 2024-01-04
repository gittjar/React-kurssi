import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather, Visibility } from './types';
import DiaryEntryComponent from './DiaryEntry';

const App: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: '',
  });

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const response = await axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries');
      setDiaryEntries(response.data);
    };

    fetchDiaryEntries();
  }, []);

  const addEntry = async () => {
    const response = await axios.post<DiaryEntry>('http://localhost:3001/api/diaries', newEntry);
    setDiaryEntries([...diaryEntries, response.data]);
    setNewEntry({ date: '', weather: Weather.Sunny, visibility: Visibility.Great, comment: '' });
  };

  return (
    <div>
      <div>
        <input
          value={newEntry.date}
          onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
          placeholder="Date"
        />
        <select
          value={newEntry.weather}
          onChange={e => setNewEntry({ ...newEntry, weather: e.target.value as Weather })}
        >
          {Object.values(Weather).map(weather => (
            <option key={weather} value={weather}>
              {weather}
            </option>
          ))}
        </select>
        <select
          value={newEntry.visibility}
          onChange={e => setNewEntry({ ...newEntry, visibility: e.target.value as Visibility })}
        >
          {Object.values(Visibility).map(visibility => (
            <option key={visibility} value={visibility}>
              {visibility}
            </option>
          ))}
        </select>
        <textarea
          value={newEntry.comment}
          onChange={e => setNewEntry({ ...newEntry, comment: e.target.value })}
          placeholder="Comment"
        />
        <button onClick={addEntry}>Add entry</button>
      </div>
      {diaryEntries.map(entry => (
        <DiaryEntryComponent key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default App;