const scraper = require('./garbages/scrape');
const moment = require('moment');

const DATE_FORMAT = process.env.DATE_FORMAT;

const cache = {
  threshhold: moment.duration(86400000), // 1 Day in ms
  lastFetch: moment.utc(),
  garbageDictionary: {}
};

async function loadGarbages({ city, district, date: dateString }) {
  if (!city) {
    throw new Error('city can not be null!');
  }
  if (!district) {
    throw new Error('district can not be null!');
  }
  if (!dateString) {
    throw new Error('date can not be null!');
  }

  const now = moment().utc();
  const timeSinceLastFetch = now.diff(cache.lastFetch);
  const dictionaryKey = `${city}-${district}`;
  const date = moment.utc(dateString, DATE_FORMAT);

  const result = [];
  if (timeSinceLastFetch <= cache.threshhold && !!cache.garbageDictionary[dictionaryKey]) {
    console.info(`Using cached data for ${dictionaryKey}`);
    result.push(...cache.garbageDictionary[dictionaryKey]);
  } else {
    console.info(`Retreiving new data for ${dictionaryKey}`);
    const data = await scraper.scrape(city, district, date.year());
    cache.garbageDictionary[dictionaryKey] = data;
    cache.lastFetch = now;
    result.push(...data);
  }

  return result.filter((gd) => gd.date.isSame(date, 'day'));
}

exports.handler = async function (event, context) {
  try {
    const options = event.body ? JSON.parse(event.body) : {};
    const garbages = await loadGarbages(options);
    console.info(`${moment.utc().format('DD/MM/YY HH:mm:ss z')}: Successfully loaded garbage data`);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(garbages),
    };
  } catch (error) {
    console.error(`${moment.utc().format('DD/MM/YY HH:mm:ss z')}`, error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
      }),
    };
  }
};

