import { Breadcrumbs, Container, Link as MuiLink, Typography } from '@mui/material';
import React from 'react';
import { Datagrid, EditButton, List, TextField, TextInput } from 'react-admin';
import { Link as RouterLink } from 'react-router';
import { YesNoField } from '../components/YesNoField.tsx';

const GroupList: React.FC = () => {
  const groupFilters = [<TextInput key="search" label="Search" source="q" alwaysOn />];

  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <Typography color="text.primary">Groups</Typography>
      </Breadcrumbs>
      <List filters={groupFilters}>
        <Datagrid rowClick="edit">
          <TextField source="id" />
          <TextField source="name" />
          <YesNoField source="isPond" label={'Is Pond?'} />
          <EditButton />
        </Datagrid>
      </List>
    </Container>
  );
};

export default GroupList;
