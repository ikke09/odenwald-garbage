const app = require('./src/app/app');
const config = require('dotenv').config();
const serverless = require('serverless-http');

module.export.handler = serverless(app);