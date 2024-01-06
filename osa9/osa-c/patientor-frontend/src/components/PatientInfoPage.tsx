import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const PatientInfoPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/api/patients/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Failed to fetch patient', error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) {
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

  return (
    <div className='patient-card'>
        <p className='smallfont'>{patient.id}</p>
      <h1>{patient.name}</h1>
      <div className='thinline'></div>
      <p>Gender: {genderIcon()}</p>
      <p>Date of birth: {patient.dateOfBirth}</p>
      <p>Occupation: {patient.occupation}</p>
      <div className='thinline'></div>
      <p>This is card footer</p>
    </div>
  );
};

export default PatientInfoPage;