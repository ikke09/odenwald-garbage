import loadData from './Http-Proxy';

const getCityDistricts = async () => await loadData('cityDistricts');

const getDistricts = async (city) => await loadData(`cityDistricts/${city}`);

export { getCityDistricts, getDistricts };
