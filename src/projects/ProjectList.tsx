import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'react-admin';
import { Breadcrumbs, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ProjectEdit: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <Typography color="text.primary">Projects</Typography>
      </Breadcrumbs>
      <List>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
          <TextField source="name" />
          <TextField source="description" />
          <EditButton />
        </Datagrid>
      </List>
    </Container>
  );
};

export default ProjectEdit;
