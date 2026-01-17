import React from 'react';
import {
  BooleanField,
  Datagrid,
  DateField,
  List,
  TextField,
  TextInput
} from 'react-admin';
import { Container } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';

const userFilters = [<TextInput key="search" label="Search" source="q" alwaysOn />];

const UserList: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Users' }
        ]}
      />
      <List filters={userFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="fullName" label="Name" />
          <TextField source="email" label="Email" />
          <TextField source="role" label="Role" />
          <BooleanField source="isActive" label="Active" />
          <DateField source="createdAt" label="Created" />
        </Datagrid>
      </List>
    </Container>
  );
};

export default UserList;
