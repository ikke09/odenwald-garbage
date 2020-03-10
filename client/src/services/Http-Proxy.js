const createUrl = (path, params) => {
  const domain = process.env.REACT_APP_APIDOMAIN || 'localhost:3000';
  const query = params
    ? '?' +
      Object.keys(params)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&')
    : '';
  return `http://${domain}/api/${path}${query}`;
};

const loadData = async (path, params) => {
  const url = createUrl(path, params);
  const res = await fetch(url);
  return await res.json();
};

export default loadData;

export { createUrl };
