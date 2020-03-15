import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import env from './config/env';
import { init as initDatabase } from './lib/mongo';
import { init as initPassport } from './lib/passport';
import { checkHealth } from './controllers/health';
import { login } from './controllers/auth';
import router from './routes';

initDatabase();
initPassport();


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Initializing passport middleware
app.use(passport.initialize());

app.get('/health', checkHealth);

app.post('/login', login);

app.use(passport.authenticate('jwt', { session: false }), router);

app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
