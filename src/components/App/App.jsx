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

  const [
    { data: garbageEvents, isLoading: isGarbageEventsLoading },
    fetchGarbageEvents,
  ] = useHttpProxy(
    `${API_URL}/garbages/${userContext.city}/${userContext.district}/${userContext.day || nowFormatted}`,
    [],
  );

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const isInit = !!userContext && !isGarbageEventsLoading && !isCityDistrictsLoading;
    setIsInitialized(isInit);
    const savedDate = moment(userContext.day, DAY_FORMAT);
    if (userContext && (!userContext.day || savedDate.isBefore(now, 'day'))) {
      setUserContext({
        ...userContext,
        day: nowFormatted,
      });
    }
  }, [isCityDistrictsLoading, isGarbageEventsLoading, userContext, setUserContext, nowFormatted]);

  useEffect(() => {
    fetchGarbageEvents(`${API_URL}/garbages/${userContext.city}/${userContext.district}/${userContext.day || nowFormatted}`);
  }, [userContext, fetchGarbageEvents, nowFormatted]);

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
  };

  const handleDistrictChange = (newDistrict) => {
    setUserContext({
      ...userContext,
      district: newDistrict,
    });
  };

  const handleDayChange = (direction) => {
    const savedDate = moment(userContext.day, DAY_FORMAT);
    const newDate = savedDate.add(direction, 'd');
    if (!newDate.isBefore(now, 'day')) {
      setUserContext({
        ...userContext,
        day: newDate.format(DAY_FORMAT),
      });
    }
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
      <Header day={userContext.day || nowFormatted} onChange={handleDayChange} />
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
