import express, { Express, Request, Response } from "express";
import cors from "cors";
import { songs } from "./data/songs";

const app: Express = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GET /api/songs - Fetch all songs
app.get("/api/songs", (req: Request, res: Response) => {
  res.json(songs);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
