const fetch = require('node-fetch').default;
// needed to fix issue https://github.com/netlify/netlify-lambda/issues/201
const encoding = require('encoding');
const cheerio = require('cheerio');
const moment = require('moment');
const EventDay = require('./eventday');
const allPossibleGarbageBins = require('./garbagebins');

const baseUrl = 'https://www.abfallkalender-odenwald.de/php/Muellkalender.php?pfad=Deutsch.muellkalender';

moment.locale('de');
const scrape = async (city, district, year) => {
  const htmlContent = await fetchRawHtmlContent(city, district, year);
  return extractCalenderData(htmlContent, year);
};

const fetchRawHtmlContent = async (city, district, year) => {
  const url = encodeURI(`${baseUrl}&ort=${city}&ot=${district}&jahr=${year}`);
  const res = await fetch(url);
  const rawData = await res.buffer();
  const data = Buffer.from(rawData);
  return data.toString('utf8');
};

const extractCalenderData = (rawHtml, year) => {
  const $ = cheerio.load(rawHtml);
  const tableData = $('td');

  if (tableData.length === 0) {
    throw new Error(`Could not load data for ${year}`);
  }

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
    const dateString = `${year}-${monthString}-${monthDay}`;
    const date = moment.utc(dateString);
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
