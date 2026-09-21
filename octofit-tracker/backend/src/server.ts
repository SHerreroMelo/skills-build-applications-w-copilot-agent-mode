import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiRouter } from './routes/api.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());
app.use('/api', apiRouter);

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

await connectDatabase();

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});