import React from 'react';
import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  TextField,
  TextInput
} from 'react-admin';
import { Container } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';

const customerFilters = [<TextInput source="q" label="Search" alwaysOn key="q" />];

const CustomerList: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Customers' }
        ]}
      />
      <List filters={customerFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <TextField source="firstName" label="First" />
          <TextField source="lastName" label="Last" />
          <TextField source="primaryPhone" label="Phone" />
          <TextField source="primaryEmail" label="Email" />
          <TextField source="primaryCity" label="City" />
          <TextField source="primaryState" label="State" />
          <ShowButton />
          <EditButton />
          <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
      </List>
    </Container>
  );
};

export default CustomerList;
