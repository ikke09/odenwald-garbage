const url = (city) => {
  const domain = process.env.APIDOMAIN || 'localhost:3000';
  return `${domain}/api/citydistricts/${city}`;
};

const getCityDistricts = async () => {
  return await fetch({
    method: 'GET',
    url: url()
  });
};

const getDistricts = async (city) => {
  return await fetch({
    method: 'GET',
    url: url(city)
  });
};

export { getCityDistricts, getDistricts };
