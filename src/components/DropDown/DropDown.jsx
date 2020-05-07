/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';

const DropDown = ({
  name,
  value,
  options,
  onChange,
}) => {
  const handleChange = (event) => {
    const { value: target } = event.target;
    onChange(target);
  };

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

DropDown.defaultProps = {
  value: process.env.REACT_APP_DEFAULTCITY,
};

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropDown;
