import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Container, Grid, Typography } from '@mui/material';

const ProgramCreate: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Create>
        <SimpleForm>
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
              Program Details
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

export default ProgramCreate;
