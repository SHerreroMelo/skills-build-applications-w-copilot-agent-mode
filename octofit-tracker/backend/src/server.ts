import express from 'express';
import { API_PORT, API_BASE_URL } from './config/api.js';
import { connectDatabase } from './config/database.js';
import { apiRouter } from './routes/api.js';

const app = express();

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

app.listen(API_PORT, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${API_BASE_URL}`);
});