import React from 'react';
import {
  AutocompleteInput,
  Datagrid,
  DateField,
  DateInput,
  DeleteButton,
  Edit,
  ReferenceInput,
  ReferenceManyField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  Link as MuiLink,
  Typography
} from '@mui/material';
import { AddOpportunityServiceButton } from './components/AddOpportunityServiceButton.tsx';
import { AddActivityButton } from '../components/AddActivityButton.tsx';
import { EditActivityButton } from '../components/EditActivityButton.tsx';
import { ConditionalFollowUpDateField } from '../components/ConditionalFollowUpDateField.tsx';
import { Link as RouterLink } from 'react-router';
import { FloatingToolbar } from '../components/FloatingToolbar.tsx';
import { ContactLinkButton } from '../components/ra-forms/ContactLinkButton.tsx';
import { NoteListSection } from '../components/notes/NoteListSection.tsx';
import { OPPORTUNITY_STATUS_CHOICES } from '../types/OpportunityStatusChoices.ts';
import { validateFollowUpIfLostButTrack } from '../validators/opportunityValidators.ts';

const OpportunityEdit: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/opportunities">
          Opportunities
        </MuiLink>
        <Typography color="text.primary">Manage</Typography>
      </Breadcrumbs>
      <Edit mutationMode={'pessimistic'}>
        <SimpleForm validate={validateFollowUpIfLostButTrack}>
          <FloatingToolbar />
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
              Opportunity Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ display: 'flex' }}>
                  <ReferenceInput source="contactId" reference="contacts" label="Contact" fullWidth>
                    <AutocompleteInput
                      optionText={(record) => `${record.firstName} ${record.lastName}`}
                      filterToQuery={(searchText: string) => ({ q: searchText })}
                      helperText={false}
                    />
                  </ReferenceInput>
                  <ContactLinkButton />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <SelectInput
                  helperText={false}
                  source="status"
                  label="Status"
                  choices={OPPORTUNITY_STATUS_CHOICES}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReferenceInput
                  source="opportunityStageId"
                  reference="opportunity-stages"
                  label="Stage"
                  fullWidth
                >
                  <SelectInput optionText="name" helperText={false} />
                </ReferenceInput>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DateInput
                  source="followUpDate"
                  label="Follow Up Date"
                  helperText={false}
                  format={(v) => (v && v.includes('T') ? v.split('T')[0] : v)}
                  parse={(v) => (v ? v : null)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DateInput
                  source="dateOpened"
                  format={(v) => (v && v.includes('T') ? v.split('T')[0] : v)}
                  parse={(v) => (v ? v : null)}
                  helperText={false}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DateInput
                  source="dateClosed"
                  format={(v) => (v && v.includes('T') ? v.split('T')[0] : v)}
                  parse={(v) => (v ? v : null)}
                  helperText={false}
                />
              </Grid>

              {/* Referred By Section */}
              <Grid size={{ xs: 12 }}>
                <Typography variant="h6" sx={{}}>
                  Referred By
                </Typography>
              </Grid>

              {/* Referred By Contact */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReferenceInput
                  source="referredByContactId"
                  reference="contacts"
                  label="Referred By Contact"
                  fullWidth
                  helperText={false}
                >
                  <AutocompleteInput
                    optionText={(record) => `${record.firstName} ${record.lastName}`}
                    filterToQuery={(searchText: string) => ({ q: searchText })}
                    helperText={false}
                  />
                </ReferenceInput>
              </Grid>

              {/* Referred By Group */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReferenceInput
                  source="referredByGroupId"
                  reference="groups"
                  label="Referred By Group"
                  fullWidth
                  helperText={false}
                >
                  <AutocompleteInput
                    optionText="name"
                    filterToQuery={(searchText: string) => ({ q: searchText })}
                    helperText={false}
                  />
                </ReferenceInput>
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
            </Grid>
            <Divider sx={{ marginY: 2 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant={'subtitle1'} gutterBottom>
                  Programs
                </Typography>
                <ReferenceManyField
                  label="Services"
                  reference="opportunity-services"
                  target="opportunityId"
                >
                  <Datagrid
                    bulkActionButtons={false}
                    empty={
                      <Box>
                        <small>No programs yet.</small>
                      </Box>
                    }
                  >
                    <TextField source="displayName" label={'Name'} />
                    <DeleteButton
                      mutationMode="pessimistic"
                      redirect={false}
                      label="Remove"
                      confirmTitle="Are you sure?"
                      confirmContent="This will remove the program from the opportunity."
                    />
                  </Datagrid>
                </ReferenceManyField>
                <Box mt={2}>
                  <AddOpportunityServiceButton />
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant={'subtitle1'} gutterBottom>
                  Activity
                </Typography>
                <ReferenceManyField
                  label="Activities"
                  reference="opportunity-activities"
                  target="opportunityId"
                >
                  <Datagrid
                    bulkActionButtons={false}
                    empty={
                      <Box>
                        <small>No activity yet.</small>
                      </Box>
                    }
                  >
                    <TextField source="type" />
                    <TextField source="note" />
                    <DateField
                      source="dateSent"
                      label="Activity Date"
                      locales="en-US"
                      options={{ timeZone: 'UTC' }}
                    />

                    <ConditionalFollowUpDateField
                      source="followUpDate"
                      label="Follow Up On"
                      locales="en-US"
                      options={{ timeZone: 'UTC' }}
                    />
                    <EditActivityButton
                      keyName={'opportunityId'}
                      resource={'opportunity-activities'}
                    />
                    <DeleteButton
                      mutationMode="pessimistic"
                      redirect={false}
                      label="Remove"
                      confirmTitle="Are you sure?"
                      confirmContent="This will remove the activiy from the opportunity."
                    />
                  </Datagrid>
                </ReferenceManyField>
                <Box my={2}>
                  <AddActivityButton
                    keyName={'opportunityId'}
                    resource={'opportunity-activities'}
                  />
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />

            <NoteListSection entityType="OPPORTUNITY" />
          </Container>
        </SimpleForm>
      </Edit>
    </Container>
  );
};

export default OpportunityEdit;
