const scraper = require('./scrape');
const moment = require('moment');

const loadData = async (city, district) => await scraper.scrape(city, district, moment().year());

async function loadGarbages(city, district, day = null) {
  try {
    if (!city || !district) {
      throw new Error('city & district can not be null!');
    }
    let data = await loadData(city, district)
    if (day) {
      const queryDay = moment(day, 'DD-MM');
      data = data.filter((d) => d.date.isSame(queryDay, 'day'));
    }

    return data;
  } catch (exception) {
    next(exception);
  }
}

exports.handler = async function (event, context, callback) {
  console.log({ event, context });
  const garbages = await loadGarbages('Michelstadt', 'Kernstadt');
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(garbages),
  });
};

