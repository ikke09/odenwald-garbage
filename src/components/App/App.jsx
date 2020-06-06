import React, { useState, useEffect } from 'react';
import { CircularProgress, Zoom, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import moment from 'moment';
import Garbage from '../Garbage/Garbage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AreaSelection from '../AreaSelection/AreaSelection';
import useHttpProxy from '../../hooks/UseHttpProxy';
import useLocalStorage from '../../hooks/UseLocalStorage';

const ContentContainer = styled(Grid)({
  height: '100%',
  'flex-direction': 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const LoadingBar = styled(CircularProgress)({
  color: '#28587b',
});

const API_URL = process.env.REACT_APP_API;
const DAY_FORMAT = process.env.REACT_APP_DAY_FORMAT;

const App = () => {
  const now = moment();
  const nowFormatted = now.format(DAY_FORMAT);

  const [{ data: cityDistricts, isLoading: isCityDistrictsLoading }] = useHttpProxy(`${API_URL}/citydistricts`, {});

  const [userContext, setUserContext] = useLocalStorage(process.env.REACT_APP_LOCALSTORAGE_KEY, {
    city: process.env.REACT_APP_DEFAULT_CITY,
    district: process.env.REACT_APP_DEFAULT_DISTRICT,
    day: nowFormatted,
  });

  const [selectedDate, setSelectedDate] = useState(userContext.day || nowFormatted);

  const [
    { data: garbageEvents, isLoading: isGarbageEventsLoading },
    fetchGarbageEvents,
  ] = useHttpProxy(
    `${API_URL}/garbages/${userContext.city}/${userContext.district}/${selectedDate}`,
    [],
  );

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const isInit = !!userContext && !isGarbageEventsLoading && !isCityDistrictsLoading;
    if (userContext) {
      const savedDay = moment(userContext.day, DAY_FORMAT);
      if (!userContext.day || savedDay.isBefore(now, 'day')) {
        setUserContext({
          ...userContext,
          day: nowFormatted,
        });
        setSelectedDate(nowFormatted);
      }
    }
    setIsInitialized(isInit);
  }, [isCityDistrictsLoading, isGarbageEventsLoading, userContext]);

  const handleCityChange = (newCity) => {
    const districtsOfNewCity = cityDistricts[newCity];
    const districtAvailable = !!districtsOfNewCity.find(
      (district) => district === userContext.district,
    );
    const newDistrict = districtAvailable ? userContext.district : districtsOfNewCity[0];
    setUserContext({
      ...userContext,
      city: newCity,
      district: newDistrict,
    });
    fetchGarbageEvents(`${API_URL}/garbages/${newCity}/${newDistrict}/${selectedDate}`);
  };

  const handleDistrictChange = (newDistrict) => {
    setUserContext({
      ...userContext,
      district: newDistrict,
    });
    fetchGarbageEvents(`${API_URL}/garbages/${userContext.city}/${newDistrict}/${selectedDate}`);
  };

  if (!isInitialized) {
    return (
      <ContentContainer container item xs={8}>
        <Zoom
          in={!isInitialized}
          style={{
            transitionDelay: !isInitialized ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <LoadingBar size={64} />
        </Zoom>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer container item xs={8} spacing={10}>
      <Header day={selectedDate} />
      <Garbage garbages={garbageEvents} />
      <AreaSelection
        city={userContext.city}
        district={userContext.district}
        cities={Object.keys(cityDistricts)}
        districts={cityDistricts[userContext.city]}
        handleCityChange={handleCityChange}
        handleDistrictChange={handleDistrictChange}
      />
      <Footer />
    </ContentContainer>
  );
};

export default App;
