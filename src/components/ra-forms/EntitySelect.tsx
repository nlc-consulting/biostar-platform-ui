import React from 'react';
import { ReferenceInput, AutocompleteInput, useInput } from 'react-admin';

export interface BasicEntity {
  id: number;
  name?: string;
  firstName?: string;
  lastName?: string;
}

interface Props {
  source: string;
  reference: string;
  label?: string;
  optionText?: (r: BasicEntity) => string;
}

export const EntitySelect: React.FC<Props> = ({
  source,
  reference,
  label,
  optionText = (r) => r.name || `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim()
}) => {
  // RA controls the whole field
  useInput({ source });

  return (
    <ReferenceInput source={source} reference={reference} label={label} fullWidth>
      <AutocompleteInput
        optionText={optionText}
        helperText={false}
        filterToQuery={(q) => ({ q })}
      />
    </ReferenceInput>
  );
};
