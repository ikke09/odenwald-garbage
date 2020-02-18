const express = require('express');
const scraper = require('../src/scrape');
const moment = require('moment');

const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    const { city, district, day } = req.query;
    if (!city || !district) {
      next(new Error('City and District have to be set!'));
    }
    const now = moment();
    let data = await scraper.scrape(city, district, now.year());
    if (day) {
      const queryDay = moment(day, 'DD-MM');
      data = data.filter((d) => d.date.isSame(queryDay, 'day'));
    }
    res.json(data);
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
