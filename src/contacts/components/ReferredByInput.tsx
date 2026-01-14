import { ReferenceInput, AutocompleteInput, useInput } from 'react-admin';

const ReferredByInput = () => {
  const {
    field: { value: selectedId }
  } = useInput({ source: 'referredById' });

  return (
    <ReferenceInput
      source="referredById"
      reference="contacts"
      label="Referred By"
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

export default ReferredByInput;
