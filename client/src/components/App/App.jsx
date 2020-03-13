import React, { useState, useEffect } from 'react';
import { CircularProgress, Fade } from '@material-ui/core';
import moment from 'moment';
import './App.css';
import Garbage from '../Garbage/Garbage';
import Footer from '../Footer/Footer';
import DropDown from '../DropDown/DropDown';
import { getCityDistricts } from '../../services/CityDistricts.service';
import { getGarbageEventsOn } from '../../services/Garbage.service';

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [defaultPreferences, setDefaultPreferences] = useState({
    city: process.env.REACT_APP_DEFAULTCITY,
    district: process.env.REACT_APP_DEFAULTDISTRICT
  });
  const [cityDistricts, setCityDistricts] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);
  const [currentDistrict, setCurrentDistrict] = useState(null);
  const [event, setEvent] = useState(null);

  // load preferences from localStorage or environment
  // fetching city-districts map
  useEffect(() => {
    const fetchData = async () => {
      console.log('fetching cityDistricts data');
      const data = await getCityDistricts();
      setCityDistricts(data);
    };
    const loadLocalSettings = () => {
      const storageData = localStorage.getItem(process.env.REACT_APP_LOCALSTORAGE_KEY);
      if (storageData) {
        const defaults = JSON.parse(storageData);
        console.log('locale settings loaded', defaults);
        setDefaultPreferences(defaults);
        setCurrentCity(defaults.city);
        setCurrentDistrict(defaults.district);
      }
    };
    const updateInitialized = () => {
      console.log('Initialized!!!');
      setIsInitialized(true);
    };

    fetchData();
    loadLocalSettings();
    updateInitialized();
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      const day = moment().format('DD-MM');
      console.log('fetching event data for', { currentCity, currentDistrict, day });
      const data = await getGarbageEventsOn(currentCity, currentDistrict, day);
      setEvent(data);
    };
    if (currentCity && currentDistrict) {
      fetchEventData();
    }
  }, [currentDistrict, currentCity]);

  // update preferences
  useEffect(() => {
    console.log('Updating preferences');
    const preferences = {
      city: currentCity,
      district: currentDistrict
    };
    const key = process.env.REACT_APP_LOCALSTORAGE_KEY;
    localStorage.setItem(key, JSON.stringify(preferences));
  }, [currentCity, currentDistrict]);

  const handleCityChange = (newCity) => {
    console.log('city changed', newCity);
    setCurrentCity(newCity);
    console.log('districts of new city', cityDistricts[newCity]);
    const districtsOfNewCity = cityDistricts[newCity];
    const districtAvailable = !!districtsOfNewCity.find((district) => district === currentDistrict);
    if (!districtAvailable) {
      setCurrentDistrict(districtsOfNewCity[0]);
    }
  };

  const handleDistrictChange = (newDistrict) => {
    console.log('district changed', newDistrict);
    setCurrentDistrict(newDistrict);
  };

  if (!isInitialized) {
    return (
      <div className='app'>
        Loading...
        <Fade
          in={!isInitialized}
          style={{
            transitionDelay: !isInitialized ? '800ms' : '0ms'
          }}
          unmountOnExit>
          <CircularProgress />
        </Fade>
      </div>
    );
  }

  return (
    <div className='app'>
      <h1>{moment().format('dddd, DD.MM.YYYY')}</h1>
      <Garbage data={event} />
      <div className='selection'>
        für
        <DropDown
          name='city'
          value={currentCity}
          default={defaultPreferences.city}
          options={cityDistricts ? Object.keys(cityDistricts) : []}
          onChange={handleCityChange}
        />
        <DropDown
          name='district'
          value={currentDistrict}
          default={defaultPreferences.district}
          options={cityDistricts ? cityDistricts[currentCity] : []}
          onChange={handleDistrictChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
