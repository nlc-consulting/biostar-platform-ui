import React from 'react';
import {
  BooleanField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  TextField,
  TextInput
} from 'react-admin';
import { Container } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';

const leadFilters = [<TextInput source="q" label="Search" alwaysOn key="q" />];

const LeadList: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Leads' }
        ]}
      />
      <List filters={leadFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <TextField source="firstName" label="First" />
          <TextField source="lastName" label="Last" />
          <TextField source="phone" label="Phone" />
          <TextField source="email" label="Email" />
          <TextField source="status" label="Status" />
          <BooleanField source="isEmergency" label="Emergency" />
          <DateField source="receivedAt" label="Received" />
          <ShowButton />
          <EditButton />
          <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
      </List>
    </Container>
  );
};

export default LeadList;
