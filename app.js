import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import cors from 'cors';

import indexRouter from './routes/index.js';
import questionnairesRouter from './routes/questionnaire.routes.js';
import responsesRouter from './routes/responses.route.js';

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
app.use('/questionnaires', questionnairesRouter);
app.use('/responses', responsesRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.error(err.stack);

  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: res.locals.error,
  });
});

export default app;
