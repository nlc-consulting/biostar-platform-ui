import { ReferenceInput, AutocompleteInput, useInput } from 'react-admin';

const IntroducedByInput = () => {
  const {
    field: { value: selectedId }
  } = useInput({ source: 'introducedById' });

  return (
    <ReferenceInput
      source="introducedById"
      reference="contacts"
      label="Introduced To"
      fullWidth
      filter={{ id: selectedId ? [selectedId] : undefined }}
    >
      <AutocompleteInput
        optionText={(record) => `${record.firstName} ${record.lastName}`}
        filterToQuery={(searchText) => {
          const base = { q: searchText };
          return selectedId ? { ...base, id: [selectedId] } : base;
        }}
        helperText={false}
      />
    </ReferenceInput>
  );
};

export default IntroducedByInput;
