import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

const DropDown = ({ name, value, options, onChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  console.log('Rendering DropDown', name);

  return (
    <FormControl>
      <InputLabel>{name}</InputLabel>
      <Select value={value} onChange={handleChange}>
        {options.map((opt, index) => (
          <MenuItem key={index} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropDown;
