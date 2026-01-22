import React from 'react';
import { Datagrid, DateField, EditButton, List, TextField, TextInput } from 'react-admin';
import { Container } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';

const projectFilters = [<TextInput source="q" label="Search" alwaysOn key="q" />];

const ProjectList: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Projects' }
        ]}
      />
      <List filters={projectFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
          <TextField source="name" label="Project" />
          <TextField source="status" label="Status" />
          <TextField source="customer.firstName" label="Customer First" />
          <TextField source="customer.lastName" label="Customer Last" />
          <TextField source="lossType" label="Loss Type" />
          <TextField source="propertyCity" label="City" />
          <DateField source="createdAt" label="Created" />
          <EditButton />
        </Datagrid>
      </List>
    </Container>
  );
};

export default ProjectList;
