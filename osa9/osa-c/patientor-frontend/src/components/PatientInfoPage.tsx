import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddEntryForm from './AddEntryForm';

const PatientInfoPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [diagnoses, setDiagnoses] = useState([]);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [loadingDiagnoses, setLoadingDiagnoses] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/patients/${id}`);
        setPatient(response.data);
        setLoadingPatient(false);
      } catch (error) {
        console.error('Failed to fetch patient', error);
      }
    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get('http://localhost:3003/api/diagnoses');
        setDiagnoses(response.data);
        setLoadingDiagnoses(false);
      } catch (error) {
        console.error('Failed to fetch diagnoses', error);
      }
    };
     // Fetch the diagnoses data immediately
    fetchDiagnoses();
  }, []);


  if (loadingPatient || loadingDiagnoses) {
    return <div>Loading...</div>;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case 'male':
        return 'M';
      case 'female':
        return 'F';
      default:
        return 'O'; // for 'other'
    }
  };

  const getDiagnosisDescription = (code) => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : '';
  };



  return (
   
    <div className='main'>
            <AddEntryForm patientId={patient.id} />

       <section className='patient-card'>
      <p className='smallfont'>{patient.id}</p>
      <h1>{patient.name}</h1>
      <div className='thinline'></div>
      <p>Gender: {genderIcon()}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>
      <p>Occupation: {patient.occupation}</p>
      <div className='thinline'></div>
      <h2>Entries</h2>
      {patient.entries.map(entry => (
        <div key={entry.id} className='entry-card'>
          <p>{entry.date}: {entry.description}</p>
          <p>Specialist: {entry.specialist}</p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(code => (
                <li key={code}>{code}: {getDiagnosisDescription(code)}</li>
              ))}
            </ul>
          )}
          {entry.discharge && <p>Discharge: {entry.discharge.date} <br></br> {entry.discharge.criteria}</p>}
        </div>
      ))}
      <div className='thinline'></div>
      <p>This is card footer</p>
      </section>
          </div>
         
  );
};  

export default PatientInfoPage;