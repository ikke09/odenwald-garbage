import React, { useState, useEffect } from 'react';
import { CircularProgress, Fade } from '@material-ui/core';
import moment from 'moment';
import './App.css';
import Garbage from '../Garbage/Garbage';
import Footer from '../Footer/Footer';
import DropDown from '../DropDown/DropDown';
import useHttpProxy from '../../hooks/UseHttpProxy';
import useLocalStorage from '../../hooks/UseLocalStorage';

const App = () => {
  const API_URL = `http://${process.env.REACT_APP_APIDOMAIN || 'localhost:3000'}/api`;
  const DAY = moment().format('DD-MM');

  const [{ data: cityDistricts, isLoading: isCityDistrictsLoading, hasError: hasCityDistrictsErrors }] = useHttpProxy(
    `${API_URL}/cityDistricts`,
    {}
  );
  const [userContext, setUserContext] = useLocalStorage(process.env.REACT_APP_LOCALSTORAGE_KEY, {
    city: process.env.REACT_APP_DEFAULTCITY,
    district: process.env.REACT_APP_DEFAULTDISTRICT
  });
  const [
    { data: garbageEvents, isLoading: isGarbageEventsLoading, hasError: hasGarbageEventsErrors },
    fetchGarbageEvents
  ] = useHttpProxy(`${API_URL}/garbages/${userContext.city}/${userContext.district}/${DAY}`, []);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const isInit = !!userContext && !isGarbageEventsLoading && !isCityDistrictsLoading;
    console.log('Check if initialized', isInit);
    setIsInitialized(isInit);
  }, [isCityDistrictsLoading, isGarbageEventsLoading, userContext]);

  const handleCityChange = (newCity) => {
    console.log('city changed', newCity);
    const districtsOfNewCity = cityDistricts[newCity];
    console.log('districts of new city', districtsOfNewCity);
    const districtAvailable = !!districtsOfNewCity.find((district) => district === userContext.district);
    const newDistrict = districtAvailable ? userContext.district : districtsOfNewCity[0];
    setUserContext({
      ...userContext,
      city: newCity,
      district: newDistrict
    });
    fetchGarbageEvents(`${API_URL}/garbages/${newCity}/${newDistrict}/${DAY}`);
  };

  const handleDistrictChange = (newDistrict) => {
    console.log('district changed', newDistrict);
    setUserContext({
      ...userContext,
      district: newDistrict
    });
    fetchGarbageEvents(`${API_URL}/garbages/${userContext.city}/${newDistrict}/${DAY}`);
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
      <Garbage data={garbageEvents} />
      <div className='selection'>
        für
        <DropDown
          name='city'
          value={userContext.city}
          options={Object.keys(cityDistricts)}
          onChange={handleCityChange}
        />
        <DropDown
          name='district'
          value={userContext.district}
          options={cityDistricts[userContext.city]}
          onChange={handleDistrictChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default App;
