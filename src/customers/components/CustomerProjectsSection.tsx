import React from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  ReferenceManyField,
  ShowButton,
  TextField,
  useRecordContext
} from 'react-admin';

const CustomerProjectsSection: React.FC = () => {
  const record = useRecordContext();
  if (!record?.id) return null;

  return (
    <ReferenceManyField reference="projects" target="customerId">
      <Datagrid rowClick="show" bulkActionButtons={false}>
        <TextField source="name" label="Project" />
        <TextField source="status" label="Status" />
        <TextField source="lossType" label="Loss Type" />
        <TextField source="propertyCity" label="City" />
        <DateField source="createdAt" label="Created" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </ReferenceManyField>
  );
};

export default CustomerProjectsSection;
