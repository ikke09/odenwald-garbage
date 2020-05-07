const express = require('express');
const cityDistricts = require('../constants/city-districts');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.json(cityDistricts);
});

router.get('/:city', function (req, res, next) {
  res.json(cityDistricts[req.params['city']]);
});

module.exports = router;
