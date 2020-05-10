const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const indexRouter = require('./routes/index.route');
const cityDistrictsRouter = require('./routes/city-districts.route');
const garbageRouter = require('./routes/garbages.route');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  app.use(
    cors({
      origin: `${process.env.URL}`,
      optionsSuccessStatus: 200,
    }),
  );
}
app.use(logger(isProduction ? 'common' : 'dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by');

app.get('/', function (req, res, next) {
  res.json({
    version: '1.0.0.0'
  });
});
app.use('/api', indexRouter);
app.use('/api/citydistricts', cityDistrictsRouter);
app.use('/api/garbages', garbageRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: isProduction ? '🥞' : err.stack,
  });
});

module.exports = app;
