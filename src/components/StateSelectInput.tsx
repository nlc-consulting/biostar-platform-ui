import React from 'react';
import { SelectInput, type SelectInputProps } from 'react-admin';
import { US_STATES } from '../constants/usStates';

const StateSelectInput: React.FC<SelectInputProps> = (props) => {
  return (
    <SelectInput
      label="State"
      source="primaryState"
      choices={US_STATES}
      fullWidth
      helperText={false}
      {...props}
    />
  );
};

export default StateSelectInput;
