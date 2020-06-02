import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { styled } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

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

const Header = ({date}) => {
  return (
    <HeaderWrapper container item spacing={3}>
      <Grid item>
        <HeaderContent>{date.format('dddd,')}</HeaderContent>
      </Grid>
      <Grid item>
        <HeaderContent>{date.format('DD.MM.YYYY')}</HeaderContent>
      </Grid>
    </HeaderWrapper>
  );
};

Header.propTypes = {
  date: PropTypes.instanceOf(moment).isRequired,
};

export default Header;
