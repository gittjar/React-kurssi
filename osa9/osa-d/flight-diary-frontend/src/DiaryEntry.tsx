import React from 'react';
import { DiaryEntry } from './types';

const DiaryEntryComponent: React.FC<{ entry: DiaryEntry }> = ({ entry }) => (
  <div>
    <h3>{entry.date}</h3>
    <p>Weather: {entry.weather}</p>
    <p>Visibility: {entry.visibility}</p>
    <p>{entry.comment}</p>
  </div>
);

export default DiaryEntryComponent;