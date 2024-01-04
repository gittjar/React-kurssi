import React from 'react';
import { DiaryEntry } from './types';

const DiaryEntryComponent: React.FC<{ entry: DiaryEntry }> = ({ entry }) => (
  <div>
    <h2>{entry.date}</h2>
    <p>Weather: {entry.weather}</p>
    <p>Visibility: {entry.visibility}</p>
    <p>{entry.comment}</p>
  </div>
);

export default DiaryEntryComponent;