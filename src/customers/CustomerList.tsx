import React from 'react';
import {
  Datagrid,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  ShowButton,
  TextField,
  TextInput
} from 'react-admin';
import { Box, Container } from '@mui/material';
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
          <FunctionField
            label="Actions"
            render={(record) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ShowButton
                  record={record}
                  label=""
                  aria-label="View customer"
                  sx={{ minWidth: 0, p: 0.5 }}
                />
                <EditButton
                  record={record}
                  label=""
                  aria-label="Edit customer"
                  sx={{ minWidth: 0, p: 0.5 }}
                />
                <DeleteButton
                  record={record}
                  label=""
                  aria-label="Delete customer"
                  mutationMode="pessimistic"
                  sx={{ minWidth: 0, p: 0.5 }}
                />
              </Box>
            )}
          />
        </Datagrid>
      </List>
    </Container>
  );
};

export default CustomerList;
