import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@material-ui/core';
import './DropDown.css';

const DropDown = ({ name, value, options, onChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  console.log('Rendering DropDown', name);

  return (
    <Select name={name} autoWidth value={value} onChange={handleChange}>
      {options.map((opt, index) => (
        <MenuItem key={index} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </Select>
  );
};

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};

export default DropDown;
