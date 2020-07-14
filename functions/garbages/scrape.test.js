const scraper = require('./scrape');
const garbageBins = require('./garbagebins');
const moment = require('moment');

const mockCalender =
  '<html><table><tbody><tr><th>Januar</th></tr><tr><td>2</td><td>Mo</td><td><div>Rest</div></td><td>3</td><td>Di</td><td></td><td>4</td><td>Mi</td><td><div>Papier + Gelber-Sack</div></td></tr></tbody></table></html>';

describe('Scraper', () => {
  it('loads html content for Michelstadt', async () => {
    expect.assertions(2);
    const html = await scraper.fetchRawHtmlContent('Michelstadt', 'Kernstadt', 2020);
    expect(html).toBeDefined();
    expect(html.length).toBeGreaterThan(0);
  });

  it('should extract calender data from mock', () => {
    const calenderData = scraper.extractCalenderData(mockCalender, 2020);
    expect(calenderData.length).toBe(3);
    expect(calenderData[0].garbageBin).toBe(garbageBins.find((gb) => gb.shortName === 'Rest'));
    expect(calenderData[1].garbageBin).toBe(garbageBins.find((gb) => gb.shortName === 'Papier'));
    expect(calenderData[2].garbageBin).toBe(garbageBins.find((gb) => gb.shortName === 'Gelber-Sack'));
  });

  it('should extract calender data from real data', async () => {
    expect.assertions(3);
    const calenderData = await scraper.scrape('Michelstadt', 'Kernstadt', 2020);
    expect(calenderData).toBeDefined();
    expect(calenderData.length).toBeGreaterThan(0);
    const testDate = moment.utc('12/06/2020', 'DD/MM/YYYY');
    const singleResult = calenderData.filter((d) => d.date.isSame(testDate, 'day'))[0];
    expect(singleResult).toBeDefined();
  });

  it('should throw an exception for data in the future', async () => {
    expect.assertions(1);
    try {
      await scraper.scrape('Michelstadt', 'Kernstadt', 2099);
    } catch (err) {
      expect(err.message).toBe('Could not load data for 2099');
    }
  });
});
