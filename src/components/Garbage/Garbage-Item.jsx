import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Grid,
  Box,
} from '@material-ui/core';

const GarbageCard = styled(Card)({
  borderRadius: 12,
  minWidth: 256,
  minHeight: 128,
  textAlign: 'center',
  backgroundColor: (props) => props.bg,
  color: 'white',
  border: '5px 5px #7a7d7d',
});

const GarbageCardContent = styled(Box)({
  fontSize: '1.2em',
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  minWidth: 256,
  minHeight: 128,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const GarbageItem = ({ garbage }) => (
  <Grid item>
    <GarbageCard variant="outlined" bg={garbage ? garbage.garbageBin.color : '#ffb86f'}>
      <CardContent>
        <GarbageCardContent>
          <span>{garbage ? garbage.garbageBin.fullName : 'Keine Müllabholung'}</span>
        </GarbageCardContent>
      </CardContent>
    </GarbageCard>
  </Grid>
);

GarbageItem.defaultProps = {
  garbage: null,
};

GarbageItem.propTypes = {
  garbage: PropTypes.shape({
    garbageBin: PropTypes.shape({
      shortName: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default GarbageItem;
