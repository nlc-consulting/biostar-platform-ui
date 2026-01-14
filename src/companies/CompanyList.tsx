import React from 'react';
import { Datagrid, EditButton, List, TextField, TextInput } from 'react-admin';
import { Breadcrumbs, Container, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

const CompanyList: React.FC = () => {
  const CompanyFilters = [
    <TextInput key="search" label="Search" source="q" alwaysOn />
    // <ReferenceInput
    //   key="status"
    //   label="Status"
    //   source="contactStatusId"
    //   reference="contact-statuses"
    //   alwaysOn
    // >
    //   <SelectInput optionText="name" emptyText="All" />
    // </ReferenceInput>
  ];

  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <Typography color="text.primary">Companies</Typography>
      </Breadcrumbs>
      <List filters={CompanyFilters}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="name" />
          {/*<TextField source="contactStatus.name" label="Status" />*/}
          {/*<TextField source="firstName" />*/}
          {/*<TextField source="lastName" />*/}
          {/*<TextField source="company.name" label="Company" />*/}
          <EditButton />
        </Datagrid>
      </List>
    </Container>
  );
};

export default CompanyList;
