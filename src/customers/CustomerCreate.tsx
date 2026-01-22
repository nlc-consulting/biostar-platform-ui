import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';
import { Container, Divider, Grid, Typography } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';
import { FloatingToolbar } from '../components/FloatingToolbar.tsx';
import { FormattedPhoneInput } from '../components/ra-forms/FormattedPhoneInput.tsx';
import StateSelectInput from '../components/StateSelectInput.tsx';

const CustomerCreate: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Customers', to: '/customers' },
          { label: 'Create' }
        ]}
      />
      <Create mutationMode="pessimistic" redirect="list">
        <SimpleForm>
          <FloatingToolbar />
          <Container maxWidth="md">
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="firstName" label="First Name" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="lastName" label="Last Name" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormattedPhoneInput source="primaryPhone" label="Primary Phone" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="primaryEmail" label="Primary Email" helperText={false} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Primary Address
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextInput source="primaryStreet" label="Street" helperText={false} fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="primaryCity" label="City" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <StateSelectInput source="primaryState" label="State" />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <TextInput source="primaryZip" label="ZIP" helperText={false} />
              </Grid>
            </Grid>
          </Container>
        </SimpleForm>
      </Create>
    </Container>
  );
};

export default CustomerCreate;
