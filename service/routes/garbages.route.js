const express = require('express');
const scraper = require('../src/scrape');
const moment = require('moment');

const router = express.Router();

const loadData = async (city, district) => await scraper.scrape(city, district, moment().year());

router.get('/:city/:district', async function(req, res, next) {
  try {
    const { city, district } = req.params;
    if (!city || !district) {
      next(new Error('City and District have to be set!'));
    }

    res.json(await loadData(city, district));
  } catch (exception) {
    next(exception);
  }
});

router.get('/:city/:district/:day', async function(req, res, next) {
  try {
    const { city, district, day } = req.params;
    if (!city || !district || !day) {
      next(new Error('City, District and Day have to be set!'));
    }
    const queryDay = moment(day, 'DD-MM');
    const data = (await loadData(city, district)).filter((d) => d.date.isSame(queryDay, 'day'));
    res.json(data);
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;
