// data/utils.ts

import { NewPatient, Gender } from './types';
import { Entry, HospitalEntry, Discharge } from './types';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing string');
  }

  return text;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth');
  }

  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDate(discharge.date) || !isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge');
  }

  return discharge;
};

export const toNewEntry = (object: any): Entry => {
  switch (object.type) {
    case "Hospital":
      const newEntry: HospitalEntry = {
        type: "Hospital",
        date: parseDateOfBirth(object.date), // use parseDateOfBirth instead of parseDate
        specialist: parseString(object.specialist),
        description: parseString(object.description),
        discharge: parseDischarge(object.discharge),
      };
      if (object.diagnosisCodes) {
        newEntry.diagnosisCodes = object.diagnosisCodes;
      }
      return newEntry;
    default:
      throw new Error(`Invalid or missing type: ${object.type}`);
  }
};