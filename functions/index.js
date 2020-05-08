const config = require('dotenv').config();
const app = require('./src/app');

const port = process.env.SERVICE_PORT || 5050;
app.listen(port, () => {
    console.debug(`Listening on Port ${port}...`);
});