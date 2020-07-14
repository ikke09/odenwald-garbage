import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { styled } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const HeaderStyled = styled(Grid)({
  'flex-direction': 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const HeaderContentStyled = styled('h1')({
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

  const HeaderContent = (
    <Container>
      <Grid item>
        <HeaderContentStyled>{date.format('dddd,')}</HeaderContentStyled>
      </Grid>
      <Grid item>
        <HeaderContentStyled>{date.format('DD.MM.YYYY')}</HeaderContentStyled>
      </Grid>
    </Container>
  );

  return (
    <HeaderStyled container item spacing={3}>
      {
        date.isAfter(now, 'day')
        && (
          <Grid item onClick={() => handleChange(-1)}>
            <ArrowBackIosIcon fontSize="large" />
          </Grid>
        )
      }
      { HeaderContent }
      {
        !date.isSameOrAfter(maxDate, 'day')
        && (
          <Grid item onClick={() => handleChange(1)}>
            <ArrowForwardIosIcon fontSize="large" />
          </Grid>
        )
      }
    </HeaderStyled>
  );
};

Header.propTypes = {
  dateString: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Header;
