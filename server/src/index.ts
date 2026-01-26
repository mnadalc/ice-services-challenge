import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { songs } from './data/songs';

const app: Express = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.get('/api/songs', (_req: Request, res: Response) => {
  res.json(songs);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
