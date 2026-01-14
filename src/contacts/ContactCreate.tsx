import React from 'react';
import {
  ArrayInput,
  AutocompleteInput,
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput
} from 'react-admin';
import { Box, Container, Grid, Typography } from '@mui/material';
import StateSelectInput from '../components/StateSelectInput.tsx';
import ReferredByInput from './components/ReferredByInput.tsx';
import CompanyQuickAdd from './components/CompanyQuickAdd.tsx';
import ReferredByGroupInput from './components/ReferredByGroupInput.tsx';
import LinkIconButton from '../components/ LinkIconButton.tsx';
import { FormattedPhoneInput } from '../components/ra-forms/FormattedPhoneInput.tsx';

const ContactCreate: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Create mutationMode={'pessimistic'}>
        <SimpleForm>
          <Container maxWidth="md">
            <Typography variant="h6" gutterBottom>
              Contact Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReferenceInput
                  source="contactStatusId"
                  reference="contact-statuses"
                  label="Status"
                  fullWidth
                >
                  <SelectInput optionText="name" helperText={false} />
                </ReferenceInput>
              </Grid>

              <Grid
                size={{ xs: 12, sm: 6 }}
                sx={{
                  display: { xs: 'none', sm: 'block' } // hide placeholder on mobile
                }}
              />
            </Grid>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput label={'First Name'} source="firstName" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput label={'Last Name'} source="lastName" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <ReferenceInput
                    source="companyId"
                    reference="companies"
                    label="Company"
                    fullWidth
                    perPage={25}
                  >
                    <AutocompleteInput
                      optionText={(record) => record.name}
                      filterToQuery={(searchText: string) => ({ q: searchText })}
                    />
                  </ReferenceInput>

                  {/* ✅ Quick Add Button */}
                  <CompanyQuickAdd />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="title" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReferenceInput
                  source="industryId"
                  reference="industry"
                  label="Industry"
                  fullWidth
                  perPage={25}
                >
                  <AutocompleteInput
                    optionText="name"
                    filterToQuery={(searchText: string) => ({ q: searchText })}
                  />
                </ReferenceInput>
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
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box display="flex" alignItems="center">
                  <TextInput label="LinkedIn" source="linkedInUrl" helperText={false} fullWidth />
                  <LinkIconButton field="linkedInUrl" label="LinkedIn" />
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
                    <SelectInput
                      source="type"
                      choices={[
                        { id: 'PERSONAL', name: 'Personal' },
                        { id: 'WORK', name: 'Work' },
                        { id: 'OTHER', name: 'Other' }
                      ]}
                      helperText={false}
                    />
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
                    <SelectInput
                      source="type"
                      choices={[
                        { id: 'CELL', name: 'Cell' },
                        { id: 'PERSONAL', name: 'Personal' },
                        { id: 'WORK', name: 'Work' },
                        { id: 'OTHER', name: 'Other' }
                      ]}
                      helperText={false}
                      sx={{ maxWidth: 75 }}
                    />
                    <FormattedPhoneInput
                      sx={{ maxWidth: 250 }}
                      source="phone"
                      label="Phone"
                      helperText={false}
                    />
                    <TextInput
                      sx={{ maxWidth: 100 }}
                      source="extension"
                      label="Ext."
                      helperText={false}
                    />
                  </SimpleFormIterator>
                </ArrayInput>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <ReferredByInput />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReferredByGroupInput />
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

export default ContactCreate;
