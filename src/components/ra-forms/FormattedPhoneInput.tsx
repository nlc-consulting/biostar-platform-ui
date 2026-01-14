import React, { useEffect } from 'react';
import { TextInput, type TextInputProps, useInput } from 'react-admin';
import { formatInternationalPhoneNumber, parsePhoneNumberInput } from '../../utils/helperUtils.ts';

export const FormattedPhoneInput: React.FC<TextInputProps> = (props) => {
  const {
    field: { onChange, onBlur, value, ref, ...fieldRest },
    fieldState: { error }
  } = useInput(props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parsePhoneNumberInput(e.target.value));
  };

  const handleBlur = () => {
    const formatted = formatInternationalPhoneNumber(value);
    onChange(formatted);
    onBlur();
  };

  useEffect(() => {
    const digitsOnly = value.replace(/[^\d]/g, '');
    const isAlreadyFormatted = value.includes('(') || value.startsWith('+');

    if (digitsOnly.length === 10 && !isAlreadyFormatted) {
      const formatted = formatInternationalPhoneNumber(digitsOnly);
      onChange(formatted);
    }
  }, [value, onChange]);

  return (
    <TextInput
      {...props}
      {...fieldRest}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      inputRef={ref}
      error={!!error}
      helperText={false}
    />
  );
};
