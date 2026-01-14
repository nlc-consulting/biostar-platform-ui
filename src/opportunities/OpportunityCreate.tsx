import React from 'react';
import {
  AutocompleteInput,
  Create,
  DateInput,
  FormDataConsumer,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput
} from 'react-admin';
import { Container, Grid, Typography } from '@mui/material';
import { OPPORTUNITY_STATUS_CHOICES } from '../types/OpportunityStatusChoices.ts';
import { validateFollowUpIfLostButTrack } from '../validators/opportunityValidators.ts';

const OpportunityCreate: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Create
        transform={(data) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { programId, ...rest } = data;
          return { ...rest };
        }}
      >
        <SimpleForm
          validate={validateFollowUpIfLostButTrack}
          defaultValues={{
            opportunityStageId: 1,
            status: 'OPEN',
            dateOpened: new Date().toISOString().split('T')[0]
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
              Opportunity Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <ReferenceInput
                  source="contactId"
                  reference="contacts"
                  label="Contact"
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
                <ReferenceInput source="programId" reference="programs">
                  <SelectInput optionText="name" fullWidth helperText={false} />
                </ReferenceInput>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormDataConsumer>
                  {({ formData }) => (
                    <ReferenceInput
                      key={`programService-${formData.programId}`} // force refresh
                      source="programServiceId"
                      reference="program-services"
                      filter={{ programId: formData.programId }}
                      fullWidth
                    >
                      <SelectInput optionText="name" label={'Product'} helperText={false} />
                    </ReferenceInput>
                  )}
                </FormDataConsumer>
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
          </Container>
        </SimpleForm>
      </Create>
    </Container>
  );
};

export default OpportunityCreate;
