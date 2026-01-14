import { ReferenceInput, AutocompleteInput, useInput } from 'react-admin';

const ReferredByGroupInput = () => {
  const {
    field: { value: selectedId }
  } = useInput({ source: 'referredByGroupId' });

  return (
    <ReferenceInput
      source="referredByGroupId"
      reference="groups"
      fullWidth
      filter={{ id: selectedId ? [selectedId] : undefined }}
    >
      <AutocompleteInput
        label="Referred By Group"
        optionText={(record) => `${record.name}`}
        filterToQuery={(searchText) => {
          const base = { q: searchText };
          return selectedId ? { ...base, id: [selectedId] } : base;
        }}
        helperText={false}
      />
    </ReferenceInput>
  );
};

export default ReferredByGroupInput;
