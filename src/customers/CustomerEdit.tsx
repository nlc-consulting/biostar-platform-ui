import React from 'react';
import { Edit, FormTab, TabbedForm, TextInput } from 'react-admin';
import { Container, Divider, Grid, Typography } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';
import { FloatingToolbar } from '../components/FloatingToolbar.tsx';
import { FormattedPhoneInput } from '../components/ra-forms/FormattedPhoneInput.tsx';
import StateSelectInput from '../components/StateSelectInput.tsx';
import { NoteListSection } from '../components/notes/NoteListSection.tsx';
import { DocumentListSection } from '../components/documents/DocumentListSection.tsx';
import CustomerProjectsSection from './components/CustomerProjectsSection.tsx';

const CustomerEdit: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Customers', to: '/customers' },
          { label: 'Manage' }
        ]}
      />
      <Edit mutationMode="pessimistic">
        <TabbedForm syncWithLocation={false}>
          <FormTab label="Details">
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
                  <FormattedPhoneInput
                    source="primaryPhone"
                    label="Primary Phone"
                    helperText={false}
                  />
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
          </FormTab>
          <FormTab label="Projects">
            <Container maxWidth="md">
              <CustomerProjectsSection />
            </Container>
          </FormTab>
          <FormTab label="Notes">
            <Container maxWidth="md">
              <NoteListSection entityType="CUSTOMER" hideTitle={true} />
            </Container>
          </FormTab>
          <FormTab label="Documents">
            <Container maxWidth="md">
              <DocumentListSection entityType="CUSTOMER" hideTitle={true} />
            </Container>
          </FormTab>
        </TabbedForm>
      </Edit>
    </Container>
  );
};

export default CustomerEdit;
