import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { Breadcrumbs, Container, Divider, Grid, Link as MuiLink, Typography } from '@mui/material';
import ProjectContacts from './components/ProjectContacts.tsx';
import { Link as RouterLink } from 'react-router';

const ProjectEdit: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/projects">
          Projects
        </MuiLink>
        <Typography color="text.primary">Manage</Typography>
      </Breadcrumbs>

      <Edit>
        <SimpleForm>
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
              Project Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="name" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="description" helperText={false} />
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />

            <ProjectContacts />
            <Divider sx={{ marginBottom: 2 }} />
          </Container>
        </SimpleForm>
      </Edit>
    </Container>
  );
};

export default ProjectEdit;
