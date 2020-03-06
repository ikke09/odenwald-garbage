const url = (params) => {
  const domain = process.env.APIDOMAIN || 'localhost:3000';
  const query = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(a[k])}`)
    .join('&');
  return `${domain}/api/garbage?${query}`;
};

const getGarbageEvents = async (city, district) => {
  return await fetch({
    method: 'GET',
    url: url({ city, district })
  });
};

const getGarbageEventsOn = async (city, district, day) => {
  return await fetch({
    method: 'GET',
    url: url({ city, district, day })
  });
};

export { getGarbageEvents, getGarbageEventsOn };
