import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEntryForm = ({ patientId }) => {
  const [type, setType] = useState('Hospital');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [description, setDescription] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [notification, setNotification] = useState(null);
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/diagnoses');
        setDiagnoses(response.data);
      } catch (error) {
        console.error('Failed to fetch diagnoses', error);
      }
    };

    fetchDiagnoses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newEntry = {
      type,
      date,
      specialist,
      description,
      diagnosisCodes,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };

    try {
      await axios.post(`http://localhost:3003/api/patients/${patientId}/entries`, JSON.stringify(newEntry), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNotification('Entry added ok!');
      setType('Hospital');
      setDate('');
      setSpecialist('');
      setDescription('');
      setDiagnosisCodes([]);
      setDischargeDate('');
      setDischargeCriteria('');
      setTimeout(() => setNotification(null), 5000); // Remove the notification after 5 seconds
    } catch (error) {
      console.error('Failed to add entry', error.response.data);
    }
  };

  return (
    <div>
      <div>
      {notification && <p>{notification}</p>}
      </div>
      <h2>Add Entry</h2>
      <div className='thinline'></div>
      <br></br>
      <form onSubmit={handleSubmit}>
        Entry date<br></br>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required /><br></br>
        Specialist<br></br>
        <input type="text" value={specialist} onChange={e => setSpecialist(e.target.value)} required /><br></br>
        Description<br></br>
        <textarea className='tekstifield' value={description} onChange={e => setDescription(e.target.value)} required /><br></br>
        Diagnosis code<br></br>
        <select onChange={e => setDiagnosisCodes([e.target.value])}>
          <option value="">Select a diagnosis code</option>
          {diagnoses.map(diagnosis => <option key={diagnosis.code} value={diagnosis.code}>{diagnosis.code}</option>)}
        </select><br></br>
        Discharge Date<br></br>
        <input type="date" value={dischargeDate} onChange={e => setDischargeDate(e.target.value)} required /><br></br>
        Discharge Criteria<br></br>
        <input type="text" value={dischargeCriteria} onChange={e => setDischargeCriteria(e.target.value)} required />
        <br></br>
        <button type="submit" className='add-entry-button'>Add Entry</button>
      </form>
    </div>
  );
};

export default AddEntryForm;