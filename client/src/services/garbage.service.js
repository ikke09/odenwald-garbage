import loadData from './Http-Proxy';

const getGarbageEvents = async (city, district) => await loadData(`garbages/${city}/${district}`);

const getGarbageEventsOn = async (city, district, day) => await loadData(`garbages/${city}/${district}/${day}`);

export { getGarbageEvents, getGarbageEventsOn };
