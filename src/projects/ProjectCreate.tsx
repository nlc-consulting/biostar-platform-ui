import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Container, Grid, Typography } from '@mui/material';

const ProjectCreate: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Create>
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
          </Container>
        </SimpleForm>
      </Create>
    </Container>
  );
};

export default ProjectCreate;
