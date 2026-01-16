import React from 'react';
import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  List,
  ShowButton,
  TextField,
  TextInput
} from 'react-admin';

const leadFilters = [<TextInput source="q" label="Search" alwaysOn key="q" />];

const LeadList: React.FC = () => {
  return (
    <List filters={leadFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
      <Datagrid rowClick="show">
        <TextField source="firstName" label="First" />
        <TextField source="lastName" label="Last" />
        <TextField source="phone" label="Phone" />
        <TextField source="email" label="Email" />
        <TextField source="status" label="Status" />
        <BooleanField source="isEmergency" label="Emergency" />
        <DateField source="receivedAt" label="Received" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export default LeadList;
