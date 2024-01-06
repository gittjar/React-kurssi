// data/types.ts

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry {
  type: "Hospital";
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
  description: string;
  discharge: Discharge;
}

export type Entry = HospitalEntry;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;