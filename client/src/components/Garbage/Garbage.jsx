import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Card, CardContent, Grid, Divider, Box } from '@material-ui/core';

const GarbageContainer = styled(Grid)({
  width: '100%',
  'flex-direction': 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const GarbageCard = styled(Card)({
  borderRadius: 12,
  minWidth: 256,
  minHeight: 128,
  textAlign: 'center',
});

const GarbageCardHeader = styled('h3')({
  fontSize: 18,
  fontWeight: 'bold',
  letterSpacing: '0.5px',
  marginTop: 4,
  marginBottom: 4,
});

const GarbageCardContentBox = styled('div')({
  backgroundColor: (props) => props.bg,
});

const Garbage = ({ garbages }) => {
  console.log('Render Garbage', garbages);
  if (!garbages || garbages.length === 0) {
    return (
      <GarbageContainer container>
        <span>Keine Müllabholung</span>
      </GarbageContainer>
    );
  }
  return (
    <GarbageContainer container spacing={3}>
      {garbages.map((garbage) => (
        <Grid key={garbage.garbageBin.shortName} item>
          <GarbageCard variant='outlined'>
            <CardContent>
              <GarbageCardHeader>{garbage.garbageBin.fullName}</GarbageCardHeader>
              <Divider light />
              <GarbageCardContentBox bg={garbage.garbageBin.color}></GarbageCardContentBox>
            </CardContent>
          </GarbageCard>
        </Grid>
      ))}
    </GarbageContainer>
  );
};

Garbage.propTypes = {
  garbages: PropTypes.arrayOf(
    PropTypes.shape({
      garbageBin: PropTypes.shape({
        shortName: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default Garbage;
