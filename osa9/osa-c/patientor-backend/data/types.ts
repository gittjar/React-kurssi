// data/types.ts
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }
  
  export type NewPatient = {
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
  };