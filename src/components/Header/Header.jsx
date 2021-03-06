import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { styled } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const HeaderWrapper = styled(Grid)({
  'flex-direction': 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const HeaderContent = styled('h1')({
  color: '#28587b',
  fontSize: '4em',
  margin: '0',
});

const Header = ({ dateString, onChange }) => {
  const handleChange = (dir) => {
    onChange(dir);
  };

  const DATE_FORMAT = process.env.REACT_APP_DATE_FORMAT;
  const now = moment.utc();
  const date = moment.utc(dateString, DATE_FORMAT);
  const maxDate = moment.utc(process.env.REACT_APP_MAX_DATE, DATE_FORMAT);

  return (
    <HeaderWrapper container item spacing={3}>
      {
        date.isAfter(now, 'day')
        && (
          <Grid item onClick={() => handleChange(-1)}>
            <ArrowBackIosIcon fontSize="large" />
          </Grid>
        )
      }
      <Grid item>
        <HeaderContent>{date.format('dddd,')}</HeaderContent>
      </Grid>
      <Grid item>
        <HeaderContent>{date.format('DD.MM.YYYY')}</HeaderContent>
      </Grid>
      {
        !date.isSameOrAfter(maxDate, 'day')
        && (
          <Grid item onClick={() => handleChange(1)}>
            <ArrowForwardIosIcon fontSize="large" />
          </Grid>
        )
      }
    </HeaderWrapper>
  );
};

Header.propTypes = {
  dateString: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Header;
