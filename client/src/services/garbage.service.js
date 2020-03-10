import loadData from './Http-Proxy';

const getGarbageEvents = async (city, district) => await loadData('garbage', { city, district });

const getGarbageEventsOn = async (city, district, day) => await loadData('garbage', { city, district, day });

export { getGarbageEvents, getGarbageEventsOn };
