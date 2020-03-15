import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';

import env from './config/env';
import { init as initDatabase } from './lib/mongo';
import { init as initPassport } from './lib/passport';
import { checkHealth } from './controllers/health';
import { login } from './controllers/auth';
import router from './routes';
import { converter, notFound, handler } from './middlewares/error';


initDatabase();
initPassport();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Initializing passport middleware
app.use(passport.initialize());

app.get('/health', checkHealth);

app.post('/login', login);

app.use(passport.authenticate('jwt', { session: false }), router);

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

app.listen(env.port, () => console.log(`Server running on port ${env.port}`));
