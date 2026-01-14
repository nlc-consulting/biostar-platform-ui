import React from 'react';
import {
  ArrayInput,
  AutocompleteInput,
  Datagrid,
  DateField,
  DeleteButton,
  Edit,
  FunctionField,
  ReferenceInput,
  ReferenceManyField,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
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
import StateSelectInput from '../components/StateSelectInput.tsx';
import { GroupNameLink } from './GroupNameLink.tsx';
import { DealNameLink } from './DealNameLink.tsx';
import { EditActivityButton } from '../components/EditActivityButton.tsx';
import { AddActivityButton } from '../components/AddActivityButton.tsx';
import { ConditionalFollowUpDateField } from '../components/ConditionalFollowUpDateField.tsx';
import ReferredByInput from './components/ReferredByInput.tsx';
import { Link as RouterLink } from 'react-router';
import CompanyQuickAdd from './components/CompanyQuickAdd.tsx';
import { FloatingToolbar } from '../components/FloatingToolbar.tsx';
import AddOpportunityQuick from './components/AddOpportunityQuick.tsx';
import { EmailLinkButton } from './components/EmailLinkButton.tsx';
import ContactQuickAdd from '../components/ra-forms/ContactQuickAdd.tsx';
import ReferredByGroupInput from './components/ReferredByGroupInput.tsx';
import LinkIconButton from '../components/ LinkIconButton.tsx';
import AddToGroup from './components/AddToGroup.tsx';
import { YesNoField } from '../components/YesNoField.tsx';
import { NoteListSection } from '../components/notes/NoteListSection.tsx';
import { FormattedPhoneInput } from '../components/ra-forms/FormattedPhoneInput.tsx';
import { IntroducedToMe } from './components/IntroducedToMe.tsx';
import { ReferredTo } from './components/ReferredTo.tsx';

const ContactEdit: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/contacts">
          Contacts
        </MuiLink>
        <Typography color="text.primary">Manage</Typography>
      </Breadcrumbs>
      <Edit mutationMode={'pessimistic'}>
        <SimpleForm>
          <FloatingToolbar />
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
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
            <Grid container spacing={2} mb={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="firstName" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="lastName" helperText={false} />
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
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Email Addresses
                </Typography>
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
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Phone Numbers
                </Typography>
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
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Referred By
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <ReferredByInput />
                  <ContactQuickAdd setValueField={'referredById'} />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <ReferredByGroupInput />
              </Grid>

              <IntroducedToMe />
            </Grid>

            <ReferredTo />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Opportunities
                </Typography>
                <ReferenceManyField
                  label="Opportunities"
                  reference="opportunities"
                  target="contactId"
                >
                  <Datagrid
                    bulkActionButtons={false}
                    rowClick={false}
                    empty={<small>No Opportunities yet.</small>}
                  >
                    <FunctionField label="Name" render={() => <DealNameLink />} />
                    <TextField source="status" />
                    <TextField source="opportunityStage.name" label={'Stage'} />
                  </Datagrid>
                </ReferenceManyField>
              </Grid>
              <AddOpportunityQuick />
            </Grid>
            <Divider sx={{ marginBottom: 2 }} />

            <Divider sx={{ marginY: 2 }} />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Groups
                </Typography>
                <ReferenceManyField label="Groups" reference="group-contacts" target="contactId">
                  <Datagrid
                    bulkActionButtons={false}
                    empty={<small>Contact is not part of any groups.</small>}
                  >
                    <FunctionField label={'Group Name'} render={() => <GroupNameLink />} />
                    <YesNoField source={'rootIsPond'} label={'Is Pond'} />
                  </Datagrid>
                </ReferenceManyField>
                <AddToGroup />
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />

            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Activity
              </Typography>
              <ReferenceManyField
                label="Activities"
                reference="contact-activities"
                target="contactId"
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

                  <EditActivityButton keyName={'contactId'} resource={'contact-activities'} />
                  <DeleteButton
                    mutationMode="pessimistic"
                    redirect={false}
                    label=""
                    confirmTitle="Are you sure?"
                    confirmContent="This will remove the activity from the contact."
                  />
                </Datagrid>
              </ReferenceManyField>
              <Box my={2}>
                <AddActivityButton keyName={'contactId'} resource={'contact-activities'} />
              </Box>
            </Grid>
            <Divider sx={{ marginBottom: 2 }} />

            <NoteListSection entityType="CONTACT" />
          </Container>
        </SimpleForm>
      </Edit>
    </Container>
  );
};

export default ContactEdit;
