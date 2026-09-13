import express from 'express';
import cors from 'cors';
import apiRouter from './routes.js';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use(cors());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});
