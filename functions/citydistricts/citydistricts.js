const cityDistrictsData = require('./citydistricts.json');

exports.handler = async function (event, context, callback) {
  console.log({ event, context });
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cityDistrictsData),
  });
};
