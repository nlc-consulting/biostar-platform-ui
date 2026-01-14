import { FunctionField, type RaRecord } from 'react-admin';

interface YesNoFieldProps {
  source: string;
  label: string;
}

export const YesNoField = ({ source, label }: YesNoFieldProps) => (
  <FunctionField
    source={source}
    label={label}
    render={(record: RaRecord) => (record?.[source] ? 'Yes' : 'No')}
  />
);
