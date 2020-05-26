const scraper = require('./garbages/scrape');
const moment = require('moment');

function parsePath(path) {
  let url = decodeURI(path);
  const paramsRegex = new RegExp(/\/\.netlify\/functions\/garbages\/([\wä-ü-ß]+)\/([\wä-ü-ß]+)\/?(\d+\-\d+)?/, 'sg');
  const paramsResults = paramsRegex.exec(url);
  if (!paramsResults) return {};
  const { 1: city, 2: district, 3: day } = paramsResults;
  return { city, district, day };
}

function loadGarbages({ city, district, day = null }, callback) {
  if (!city || !district) {
    throw new Error('city & district can not be null!');
  }
  scraper.scrape(city, district, moment().year(), (data) => {
    let result = data;
    if (day && data) {
      const queryDay = moment(day, 'DD-MM');
      result = data.filter((d) => d.date.isSame(queryDay, 'day'));
    }
    callback(result);
  });
}

exports.handler = function (event, context, callback) {
  try {
    loadGarbages(parsePath(event.path), (garbages) => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(garbages),
      });
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Could not load garbage data!',
      }),
    })
  }
};

