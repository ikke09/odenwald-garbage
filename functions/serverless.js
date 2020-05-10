const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const serverless = require('serverless-http');

dotenvExpand(dotenv.config());
const app = require('./src/app');

exports.handler = serverless(app);