const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const config = dotenv.config();

dotenvExpand(config);
const app = require('./src/app');

const port = process.env.SERVICE_PORT || 5060;
app.listen(port, () => {
    console.debug(`Listening on Port ${port}...`);
});