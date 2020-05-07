import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import GarbageItem from './Garbage-Item';

const GarbageContainer = styled(Grid)({
  width: '100%',
  'flex-direction': 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const Garbage = ({ garbages }) => (
  <GarbageContainer container spacing={3}>
    {garbages && garbages.length ? (
      garbages.map((g) => <GarbageItem key={g.garbageBin.shortName} garbage={g} />)
    ) : (
      <GarbageItem />
    )}
  </GarbageContainer>
);

Garbage.propTypes = {
  garbages: PropTypes.arrayOf(
    PropTypes.shape({
      garbageBin: PropTypes.shape({
        shortName: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default Garbage;
