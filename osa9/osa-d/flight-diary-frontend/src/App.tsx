import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryEntry } from './types';
import DiaryEntryComponent from './DiaryEntry';

const App: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const response = await axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries');
      setDiaryEntries(response.data);
    };

    fetchDiaryEntries();
  }, []);

  return (
    <div>
      {diaryEntries.map(entry => (
        <DiaryEntryComponent key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default App;