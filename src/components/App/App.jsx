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

const App = () => {
  const API_URL = `${process.env.REACT_APP_APIDOMAIN || 'localhost:3000'}/api`;
  const DAY = moment().format('DD-MM');

  const [{ data: cityDistricts, isLoading: isCityDistrictsLoading }] = useHttpProxy(`${API_URL}/cityDistricts`, {});
  const [userContext, setUserContext] = useLocalStorage(process.env.REACT_APP_LOCALSTORAGE_KEY, {
    city: process.env.REACT_APP_DEFAULTCITY,
    district: process.env.REACT_APP_DEFAULTDISTRICT,
  });
  const [
    { data: garbageEvents, isLoading: isGarbageEventsLoading },
    fetchGarbageEvents,
  ] = useHttpProxy(
    `${API_URL}/garbages/${userContext.city}/${userContext.district}/${DAY}`,
    [],
  );
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const isInit = !!userContext && !isGarbageEventsLoading && !isCityDistrictsLoading;
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
    fetchGarbageEvents(`${API_URL}/garbages/${newCity}/${newDistrict}/${DAY}`);
  };

  const handleDistrictChange = (newDistrict) => {
    setUserContext({
      ...userContext,
      district: newDistrict,
    });
    fetchGarbageEvents(`${API_URL}/garbages/${userContext.city}/${newDistrict}/${DAY}`);
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
      <Header />
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
