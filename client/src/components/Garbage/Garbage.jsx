import React from 'react';
import './Garbage.css';

const Garbage = (props) => {
  console.log('Render Garbage', props);
  if (!props.data) return null;
  const garbages = props.data;
  return (
    <div>
      {garbages.map((g) => (
        <p key={g.garbageBin.shortName}>{g.garbageBin.fullName}</p>
      ))}
    </div>
  );
};

export default Garbage;
