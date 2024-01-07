type Gender = 'male' | 'female' | 'other';

type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: [];
};

const patients: Array<Patient> = [
    {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": "male",
        "occupation": "New york city cop",
        "entries": [
            {
                "type": "Hospital",
                "date": "2022-01-01",
                "specialist": "Prof. Mettälä",
                "description": "Hospital visit for a minor injury, smashed knee",
                "discharge": {
                    "date": "1986-24-12",
                    "criteria": "The patient is better now"
                },
                "diagnosisCodes": [
                    "S62.5"
                ]
            }
        ]
    },
    {
        "id": "d2773598-f723-11e9-8f0b-362b9e155667",
        "name": "Martin Riggs",
        "dateOfBirth": "1979-01-30",
        "ssn": "300179-77A",
        "gender": "male",
        "occupation": "Cop",
        "entries": [
            {
                "type": "Hospital",
                "date": "2022-02-01",
                "specialist": "Dr. Strange-Doc",
                "description": "Hospital visit for a regular check-up",
                "discharge": {
                    "date": "2022-02-01",
                    "criteria": "Discharged after check-up, no problems"
                },
                "diagnosisCodes": [
                    "Z74.3"
                ]
            }
        ]
    },
    {
        "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
        "name": "Hans Gruber",
        "dateOfBirth": "1970-04-25",
        "ssn": "250470-555L",
        "gender": "other",
        "occupation": "Technician",
        "entries": [
            {
                "type": "Hospital",
                "date": "2022-03-01",
                "specialist": "Dr. Dolittle",
                "description": "Hospital visit for a minor illness",
                "discharge": {
                    "date": "2022-03-02",
                    "criteria": "Discharged after treatment, given painkillers"
                },
                "diagnosisCodes": [
                    "J06.9"
                ]
            }
        ]
    },
    {
        "id": "d2773822-f723-11e9-8f0b-362b9e155667",
        "name": "Dana Scully",
        "dateOfBirth": "1974-01-05",
        "ssn": "050174-432N",
        "gender": "female",
        "occupation": "Forensic Pathologist",
        "entries": []
    },
    {
        "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
        "name": "Matti Luukkainen",
        "dateOfBirth": "1971-04-09",
        "ssn": "090471-8890",
        "gender": "male",
        "occupation": "Digital evangelist",
        "entries": []
    },
    {
        "id": "d2733c6e-f423-11e9-8f1b-362b9e155367",
        "name": "Jack Sparrow",
        "dateOfBirth": "1731-01-11",
        "ssn": "011131-9012",
        "gender": "male",
        "occupation": "Pirate",
        "entries": [
            {
                "type": "Hospital",
                "date": "2022-01-01",
                "specialist": "Dr. Sealegs",
                "description": "Hospital visit for scurvy",
                "discharge": {
                    "date": "2022-01-02",
                    "criteria": "Discharged after vitamin C treatment"
                },
                "diagnosisCodes": [
                    "A00.1"
                ]
            },
            {
                "type": "Hospital",
                "date": "2022-02-01",
                "specialist": "Dr. Parrot",
                "description": "Hospital visit for a peg leg adjustment",
                "discharge": {
                    "date": "2022-02-02",
                    "criteria": "Discharged after adjustment, no complications"
                },
                "diagnosisCodes": [
                    "Z74.3"
                ]
            },
            {
                "type": "Hospital",
                "date": "2022-03-01",
                "specialist": "Dr. Hookhand-Luukkainen",
                "description": "Hospital visit for a minor cutlass injury",
                "discharge": {
                    "date": "2022-03-02",
                    "criteria": "Discharged after treatment, given new eyepatch"
                },
                "diagnosisCodes": [
                    "S62.5"
                ]
            }
        ]
    },
    {
        "name": "Fox Mulder",
        "dateOfBirth": "1961-01-02",
        "ssn": "123361-1123",
        "gender": "male",
        "occupation": "Secret Agent",
        "id": "645c3d20-acc7-11ee-8bc9-35aa8700ceec",
        "entries": [
            {
                "type": "Hospital",
                "date": "2022-01-01",
                "specialist": "Dr. Öetcer",
                "description": "Hospital visit",
                "discharge": {
                    "date": "2022-01-02",
                    "criteria": "Discharged for home care, more tests needed"
                },
                "diagnosisCodes": [
                    "J10.1"
                ]
            },
            {
                "type": "Hospital",
                "date": "2022-01-01",
                "specialist": "Dr. Pepper",
                "description": "Hospital visit",
                "discharge": {
                    "date": "2022-03-01",
                    "criteria": "Discharged for home care (Break 2 weeks from coding)"
                },
                "diagnosisCodes": [
                    "S03.5"
                ]
            }
        ]
    }
]

export default patients;