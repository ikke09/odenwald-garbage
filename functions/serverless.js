const config = require('dotenv').config();
const app = require('./src/app');
const serverless = require('serverless-http');

exports.handler = serverless(app);