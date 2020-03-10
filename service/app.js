const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const config = require('dotenv').config();

const indexRouter = require('./routes/index.route');
const cityDistrictsRouter = require('./routes/city-districts.route');
const garbageRouter = require('./routes/garbage.route');

const app = express();

app.use(
  cors({
    origin: `${process.env.CLIENTORIGIN}`,
    optionsSuccessStatus: 200
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.disable('x-powered-by');
app.use('/', indexRouter);
app.use('/api', indexRouter);
app.use('/api/citydistricts', cityDistrictsRouter);
app.use('/api/garbage', garbageRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = process.env.DEBUG ? err : {};
  res.status(err.status || 500).send();
});

module.exports = app;
