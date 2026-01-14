import React from 'react';
import { SelectInput, type SelectInputProps } from 'react-admin';

const CompanyInfoTypeSelect: React.FC<Omit<SelectInputProps, 'choices'>> = (props) => {
  const choices = [
    { id: 'WORK', name: 'Work' },
    { id: 'SUPPORT', name: 'Support' },
    { id: 'BILLING', name: 'Billing' },
    { id: 'OTHER', name: 'Other' }
  ];

  return (
    <SelectInput
      {...props}
      choices={choices}
      helperText={false}
      sx={{ maxWidth: 100, ...(props.sx || {}) }}
    />
  );
};

export default CompanyInfoTypeSelect;
