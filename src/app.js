const express     = require('express');
const helmet      = require('helmet');
const morgan      = require('morgan');
const {
  authRouter,
  usersRouter
}                 = require('./routes');
const {
  invalidEndpointHandler,
  errorHandler
}                 = require('./middlewares');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', authRouter);
app.use('/users', usersRouter);

app.all('*', invalidEndpointHandler);
app.use(errorHandler);

module.exports = app;