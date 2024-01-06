// src/index.ts

import express from "express";
import cors from "cors";
import { v1 as uuid } from 'uuid';
import diagnoses from "../data/diagnoses";
import patients from "../data/patients";
import { toNewPatient } from "../data/utils";

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

app.get("/api/patients/:id", (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

app.post("/api/patients", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    newPatient.id = uuid();
    newPatient.entries = []; // here is Entry[] empty
    patients.push(newPatient);
    res.json(newPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});