import React from 'react';
import { ArrayInput, Edit, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';
import { Box, Breadcrumbs, Container, Grid, Link as MuiLink, Typography } from '@mui/material';
import StateSelectInput from '../components/StateSelectInput.tsx';
import { Link as RouterLink } from 'react-router';
import { FloatingToolbar } from '../components/FloatingToolbar.tsx';
import LinkIconButton from '../components/ LinkIconButton.tsx';
import { NoteListSection } from '../components/notes/NoteListSection.tsx';
import { FormattedPhoneInput } from '../components/ra-forms/FormattedPhoneInput.tsx';
import { EmailLinkButton } from '../contacts/components/EmailLinkButton.tsx';
import CompanyInfoTypeSelect from './components/CompanyInfoTypeSelect.tsx';
import CompanyContacts from './components/CompanyContacts.tsx';

const CompanyEdit: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/companies">
          Companies
        </MuiLink>
        <Typography color="text.primary">Manage</Typography>
      </Breadcrumbs>
      <Edit mutationMode={'pessimistic'}>
        <SimpleForm>
          <FloatingToolbar />
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
              Company Details
            </Typography>
            <Grid container spacing={2} mb={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="name" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}></Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="primaryStreet" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="primaryCity" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StateSelectInput source="primaryState" label="State" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="primaryZip" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextInput
                  source="notes"
                  label="General Notes"
                  multiline
                  rows={4}
                  fullWidth
                  helperText={false}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box display="flex" alignItems="center">
                  <TextInput label="Website URL" source="websiteUrl" helperText={false} fullWidth />
                  <LinkIconButton field="websiteUrl" label="Website" />
                </Box>
              </Grid>
              <Grid
                size={{ xs: 12 }}
                sx={{
                  '& .RaArrayInput-root .MuiFormHelperText-root': {
                    display: 'none'
                  }
                }}
              >
                <Typography variant="subtitle1">Email Addresses</Typography>
                <ArrayInput source="emails">
                  <SimpleFormIterator inline>
                    <CompanyInfoTypeSelect source="type" />
                    <TextInput source="email" label="Email" helperText={false} />
                    <EmailLinkButton />
                  </SimpleFormIterator>
                </ArrayInput>
              </Grid>
              <Grid
                size={{ xs: 12 }}
                sx={{
                  '& .RaArrayInput-root .MuiFormHelperText-root': {
                    display: 'none'
                  }
                }}
              >
                <Typography variant="subtitle1">Phone Numbers</Typography>
                <ArrayInput source="phones">
                  <SimpleFormIterator inline>
                    <CompanyInfoTypeSelect source="type" />
                    <FormattedPhoneInput
                      sx={{ maxWidth: 250 }}
                      source="phone"
                      label="Phone"
                      helperText={false}
                    />
                  </SimpleFormIterator>
                </ArrayInput>
              </Grid>
            </Grid>
            <CompanyContacts />
            <NoteListSection entityType="COMPANY" />
          </Container>
        </SimpleForm>
      </Edit>
    </Container>
  );
};

export default CompanyEdit;
