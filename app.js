import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index.js';

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Middleware setup
app.use(logger(formatsLogger));
app.use(json());
app.use(urlencoded({ extended: false }));

// CORS setup
const corsOptions = {
  exposedHeaders: 'Authorization',
};
app.use(cors(corsOptions));

// Routes setup
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});

export default app;
