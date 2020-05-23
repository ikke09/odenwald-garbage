const scraper = require('./scrape');
const garbageBins = require('./garbagebins');

const mockCalender =
  '<html><table><tbody><tr><th>Januar</th></tr><tr><td>2</td><td>Mo</td><td><div>Rest</div></td><td>3</td><td>Di</td><td></td><td>4</td><td>Mi</td><td><div>Papier + Gelber-Sack</div></td></tr></tbody></table></html>';

describe('Scraper', () => {
  it('loads html content for Michelstadt', (done) => {
    try {
      scraper.fetchRawHtmlContent('Michelstadt', 'Kernstadt', 2020, (html) => {
        expect(html).toBeDefined();
        expect(html.length).toBeGreaterThan(0);
        done();
      });
    } catch (error) {
      done(error);
    }
  });

  it('should extract calender data from mock', () => {
    const calenderData = scraper.extractCalenderData(mockCalender, 2020);
    expect(calenderData.length).toBe(3);
    expect(calenderData[0].garbageBin).toBe(garbageBins.find((gb) => gb.shortName === 'Rest'));
    expect(calenderData[1].garbageBin).toBe(garbageBins.find((gb) => gb.shortName === 'Papier'));
    expect(calenderData[2].garbageBin).toBe(garbageBins.find((gb) => gb.shortName === 'Gelber-Sack'));
  });

  it('should extract calender data from real data', (done) => {
    try {
      scraper.scrape('Michelstadt', 'Kernstadt', 2020, (calenderData) => {
        expect(calenderData).toBeDefined();
        expect(calenderData.length).toBeGreaterThan(0);
        done();
      });
    } catch (error) {
      done(error);
    }
  });
});
