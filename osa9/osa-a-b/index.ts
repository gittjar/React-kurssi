import express from 'express';
import cors from 'cors';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target }: any = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: "parameters missing" });
  } else if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(target)) {
    res.status(400).json({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});