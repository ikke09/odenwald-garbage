const https = require('https');
const cheerio = require('cheerio');
const moment = require('moment');
const EventDay = require('./eventday');
const allPossibleGarbageBins = require('./garbagebins');

const baseUrl = 'https://www.abfallkalender-odenwald.de/php/Muellkalender.php?pfad=Deutsch.muellkalender';

moment.locale('de');

const scrape = (city, district, year, callback) => {
  fetchRawHtmlContent(city, district, year, (html) => {
    callback(extractCalenderData(html));
  });
};

const fetchRawHtmlContent = (city, district, year, callback) => {
  const url = encodeURI(`${baseUrl}&ort=${city}&ot=${district}&jahr=${year}`);
  return https.get(url, (res) => {
    let data = [];
    res.on('data', (chunk) => {
      data.push(chunk);
    });
    res.on('end', () => {
      const rawData = Buffer.concat(data);
      callback(rawData.toString('utf8'));
    })
  }).on('error', (err) => {
    console.error('Fetching garbage calender from reso failed', err);
    throw new Error(err);
  });
};

const extractCalenderData = (rawHtml, year) => {
  const $ = cheerio.load(rawHtml);
  const tableData = $('td');
  let allEventDays = [];
  let month = 0;
  for (let i = 0; i < tableData.length; i += 3) {
    month++;
    if (i <= tableData.length / 2 - 1 && month > 6) {
      month = 1;
    }
    if (i > tableData.length / 2 - 1 && month > 12) {
      month = 7;
    }
    const monthDay = cheerio(tableData[i])
      .text()
      .trim()
      .padStart(2, '0');
    const monthString = (month + '').padStart(2, '0');
    const date = moment(`${monthDay}-${monthString}-${year}`, 'DD-MM-YYYY', false);
    if (!date.isValid()) continue;
    const events = cheerio(tableData[i + 2])
      .text()
      .split('+');
    const eventData = events
      .map((event) => allPossibleGarbageBins.find((gb) => gb.shortName === event.trim()))
      .filter((gb) => !!gb)
      .map((gb) => new EventDay(date, gb));

    allEventDays = allEventDays.concat(eventData);
  }
  const garbageDays = allEventDays.sort((a, b) => a.date.valueOf() - b.date.valueOf());
  return garbageDays;
};

module.exports = {
  scrape,
  fetchRawHtmlContent,
  extractCalenderData
};
