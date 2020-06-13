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
const DATE_FORMAT = process.env.REACT_APP_DATE_FORMAT;

const App = () => {
  const now = moment.utc();
  const nowFormatted = now.format(DATE_FORMAT);

  const [{ data: cityDistricts, isLoading: isCityDistrictsLoading }] = useHttpProxy(`${API_URL}/citydistricts`);

  const [userContext, setUserContext] = useLocalStorage(process.env.REACT_APP_LOCALSTORAGE_KEY, {
    city: process.env.REACT_APP_DEFAULT_CITY,
    district: process.env.REACT_APP_DEFAULT_DISTRICT,
    date: nowFormatted,
  });

  const [
    { data: garbageEvents, isLoading: isGarbageEventsLoading },
    fetchGarbageEvents,
  ] = useHttpProxy(
    `${API_URL}/garbages`,
    {
      city: userContext.city,
      district: userContext.district,
      date: userContext.date || nowFormatted,
    },
  );

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const isInit = !!userContext && !isGarbageEventsLoading && !isCityDistrictsLoading;
    setIsInitialized(isInit);
    const savedDate = moment.utc(userContext.date, DATE_FORMAT);
    if (userContext && (!userContext.date || savedDate.isBefore(now, 'd'))) {
      setUserContext({
        ...userContext,
        date: nowFormatted,
      });
    }
  },
  [isCityDistrictsLoading, isGarbageEventsLoading, userContext, setUserContext, nowFormatted, now]);

  useEffect(() => {
    fetchGarbageEvents({
      city: userContext.city,
      district: userContext.district,
      date: userContext.date || nowFormatted,
    });
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
    const savedDate = moment.utc(userContext.date, DATE_FORMAT);
    const newDate = savedDate.add(direction, 'd');
    if (!newDate.isBefore(now, 'd')) {
      setUserContext({
        ...userContext,
        date: newDate.format(DATE_FORMAT),
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
      <Header dateString={userContext.date || nowFormatted} onChange={handleDayChange} />
      {garbageEvents && (
        <Garbage garbages={garbageEvents} />
      )}
      {cityDistricts && (
        <AreaSelection
          city={userContext.city}
          district={userContext.district}
          cities={Object.keys(cityDistricts)}
          districts={cityDistricts[userContext.city]}
          handleCityChange={handleCityChange}
          handleDistrictChange={handleDistrictChange}
        />
      )}
      <Footer />
    </ContentContainer>
  );
};

export default App;
