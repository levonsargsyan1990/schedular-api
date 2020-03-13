import express from 'express';
import { config } from 'dotenv';

import { checkHealth } from './controllers/health';

config();

// Connecting to MongoDB
import './lib/mongo';

const { PORT = 8000 } = process.env;

const app = express();

app.get('/health', checkHealth);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));