const express = require('express');
const cityDistricts = require('../src/constants/city-districts');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json(cityDistricts);
});

module.exports = router;
