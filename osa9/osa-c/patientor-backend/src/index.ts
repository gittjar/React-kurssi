// src/index.ts

import express from "express";
import cors from "cors";
import diagnoses from "../data/diagnoses";

const app = express();
app.use(cors());

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (req, res) => {
  res.send(diagnoses);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});