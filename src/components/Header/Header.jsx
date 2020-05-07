import React from 'react';
import moment from 'moment';

import { styled } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const HeaderWrapper = styled(Grid)({
  'flex-direction': 'row',
  justifyContent: 'center',
  alignItems: 'center',
  // padding: '0 !important',
});

const HeaderContent = styled('h1')({
  color: '#28587b',
  fontSize: '4em',
  margin: '0',
});

const Header = () => {
  const momentNow = moment();
  return (
    <HeaderWrapper container item spacing={3}>
      <Grid item>
        <HeaderContent>{momentNow.format('dddd,')}</HeaderContent>
      </Grid>
      <Grid item>
        <HeaderContent>{momentNow.format('DD.MM.YYYY')}</HeaderContent>
      </Grid>
    </HeaderWrapper>
  );
};

export default Header;
