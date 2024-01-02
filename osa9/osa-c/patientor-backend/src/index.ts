import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/ping", (req, res) => {
  res.send("pong");
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
