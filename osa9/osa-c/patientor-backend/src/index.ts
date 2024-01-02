// src/index.ts

import express from "express";
import cors from "cors";
import { v1 as uuid } from 'uuid';
import diagnoses from "../data/diagnoses";
import patients from "../data/patients";

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (req, res) => {
  res.send(diagnoses);
});

app.get("/api/patients", (req, res) => {
  res.send(patients);
});

app.post("/api/patients", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };
  patients.push(newPatient);
  res.send(newPatient);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});