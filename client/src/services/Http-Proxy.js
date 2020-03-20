const createUrl = (path) => {
  const domain = process.env.REACT_APP_APIDOMAIN || 'localhost:3000';
  return `http://${domain}/api/${path}`;
};

const loadData = async (path) => {
  const url = createUrl(path);
  const res = await fetch(url);
  return await res.json();
};

export default loadData;

export { createUrl };
