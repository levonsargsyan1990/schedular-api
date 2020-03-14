import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { config } from 'dotenv';

import { init as initDatabase } from './lib/mongo';
import { init as initPassport } from './lib/passport';
import { checkHealth } from './controllers/health';
import { login } from './controllers/auth';

config();

initDatabase();
initPassport();

const { PORT = 8000 } = process.env;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Initializing passport middleware
// app.use(passport.initialize());

app.get('/health', checkHealth);

app.post('/login', login);

app.get('/secure', passport.authenticate('jwt', { session: false }), (req, res) => { console.log('SECURE'); });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
