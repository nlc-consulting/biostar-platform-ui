import React from 'react';
import { ArrayInput, Create, SimpleForm, SimpleFormIterator, TextInput } from 'react-admin';
import { Box, Container, Grid, Typography } from '@mui/material';
import StateSelectInput from '../components/StateSelectInput.tsx';
import LinkIconButton from '../components/ LinkIconButton.tsx';
import { FormattedPhoneInput } from '../components/ra-forms/FormattedPhoneInput.tsx';
import CompanyInfoTypeSelect from './components/CompanyInfoTypeSelect.tsx';

const CompanyCreate: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Create mutationMode={'pessimistic'}>
        <SimpleForm>
          <Container maxWidth="md">
            <Typography variant="h6" gutterBottom>
              Company Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput label={'Name'} source="name" helperText={false} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput label={'Street'} source="primaryStreet" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput label={'City'} source="primaryCity" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StateSelectInput source="primaryState" label="State" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput label={'Zip'} source="primaryZip" helperText={false} />
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
                    {/*<TextInput*/}
                    {/*  sx={{ maxWidth: 100 }}*/}
                    {/*  source="extension"*/}
                    {/*  label="Ext."*/}
                    {/*  helperText={false}*/}
                    {/*/>*/}
                  </SimpleFormIterator>
                </ArrayInput>
              </Grid>
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
          </Container>
        </SimpleForm>
      </Create>
    </Container>
  );
};

export default CompanyCreate;
