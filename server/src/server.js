import express from 'express';
import cors from 'cors';
import api from './routes/api.js';
import auth from './routes/auth.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', api)

app.use('/auth', auth);

export default app;
