import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import DropDown from '../DropDown/DropDown';

const AreaSelectionWrapper = styled(Grid)({
  width: '100%',
  'flex-direction': 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const AreaSelection = ({ city, district, cities, districts, handleCityChange, handleDistrictChange }) => {
  return (
    <AreaSelectionWrapper container item spacing={2}>
      <Grid item>
        <DropDown name='Stadt' value={city} options={cities} onChange={handleCityChange} />
      </Grid>
      <Grid item>
        <DropDown name='Stadtteil' value={district} options={districts} onChange={handleDistrictChange} />
      </Grid>
    </AreaSelectionWrapper>
  );
};

AreaSelection.propTypes = {
  city: PropTypes.string.isRequired,
  district: PropTypes.string.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  districts: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleDistrictChange: PropTypes.func.isRequired,
};

export default AreaSelection;
