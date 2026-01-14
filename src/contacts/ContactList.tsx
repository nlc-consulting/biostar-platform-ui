import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  ReferenceInput,
  SelectInput,
  TextField,
  TextInput
} from 'react-admin';
import { Breadcrumbs, Container, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

const ContactList: React.FC = () => {
  const ContactFilters = [
    <TextInput key="search" label="Search" source="q" alwaysOn />,
    <ReferenceInput
      key="status"
      label="Status"
      source="contactStatusId"
      reference="contact-statuses"
      alwaysOn
    >
      <SelectInput optionText="name" emptyText="All" />
    </ReferenceInput>
  ];

  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <Typography color="text.primary">Contacts</Typography>
      </Breadcrumbs>
      <List filters={ContactFilters}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="contactStatus.name" label="Status" />
          <TextField source="firstName" />
          <TextField source="lastName" />
          <TextField source="company.name" label="Company" />
          <EditButton />
        </Datagrid>
      </List>
    </Container>
  );
};

export default ContactList;
