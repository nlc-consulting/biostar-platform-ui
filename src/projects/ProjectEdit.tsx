import React from 'react';
import {
  AutocompleteInput,
  BooleanInput,
  DateInput,
  Edit,
  FormTab,
  NumberInput,
  ReferenceInput,
  SelectInput,
  TabbedForm,
  TextInput
} from 'react-admin';
import { Container, Divider, Grid, Typography } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';
import { FloatingToolbar } from '../components/FloatingToolbar.tsx';
import StateSelectInput from '../components/StateSelectInput.tsx';
import { PROJECT_STATUS_CHOICES } from '../types/ProjectStatusChoices.ts';
import { NoteListSection } from '../components/notes/NoteListSection.tsx';
import { DocumentListSection } from '../components/documents/DocumentListSection.tsx';
import { LOSS_TYPE_CHOICES } from '../types/LossTypeChoices.ts';
import AuditLogSection from '../components/audit/AuditLogSection.tsx';

const ProjectEdit: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: 'Manage' }
        ]}
      />
      <Edit mutationMode="pessimistic">
        <TabbedForm syncWithLocation={false}>
          <FormTab label="Details">
            <FloatingToolbar />
            <Container maxWidth="md">
              <Typography variant="h6" gutterBottom>
                Project Overview
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextInput source="name" label="Project Name" helperText={false} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AutocompleteInput
                    source="status"
                    label="Status"
                    choices={PROJECT_STATUS_CHOICES}
                    helperText={false}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <ReferenceInput source="customerId" reference="customers" label="Customer" fullWidth>
                    <AutocompleteInput
                      optionText={(record) =>
                        `${record.firstName ?? ''} ${record.lastName ?? ''}`.trim()
                      }
                      helperText={false}
                      filterToQuery={(q) => ({ q })}
                      fullWidth
                    />
                  </ReferenceInput>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Property Address
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextInput source="propertyStreet" label="Street" helperText={false} fullWidth />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextInput source="propertyCity" label="City" helperText={false} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <StateSelectInput source="propertyState" label="State" />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <TextInput source="propertyZip" label="ZIP" helperText={false} />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Project Details
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <SelectInput
                    source="lossType"
                    label="Type of Loss"
                    choices={LOSS_TYPE_CHOICES}
                    helperText={false}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextInput
                    source="description"
                    label="Issue Description"
                    helperText={false}
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <BooleanInput source="isEmergency" label="Emergency" />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Insurance Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextInput source="insuranceCarrier" label="Insurance Carrier" helperText={false} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextInput source="policyNumber" label="Policy Number" helperText={false} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextInput source="claimNumber" label="Claim Number" helperText={false} />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Adjusters
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextInput source="primaryAdjusterName" label="Primary Adjuster" helperText={false} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextInput
                    source="primaryAdjusterPhone"
                    label="Primary Adjuster Phone"
                    helperText={false}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextInput
                    source="primaryAdjusterEmail"
                    label="Primary Adjuster Email"
                    helperText={false}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextInput source="thirdPartyAdjusterName" label="Third-Party Adjuster" helperText={false} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextInput
                    source="thirdPartyAdjusterPhone"
                    label="Third-Party Adjuster Phone"
                    helperText={false}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <TextInput
                    source="thirdPartyAdjusterEmail"
                    label="Third-Party Adjuster Email"
                    helperText={false}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Inspection & Estimate
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DateInput
                    source="scheduledInspectionAt"
                    label="Scheduled Inspection"
                    helperText={false}
                    format={(v) => (v && v.includes('T') ? v.split('T')[0] : v)}
                    parse={(v) => (v ? v : null)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <NumberInput
                    source="estimateTotal"
                    label="Estimate Total"
                    helperText={false}
                    step={0.01}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DateInput
                    source="estimateTotalUpdatedAt"
                    label="Estimate Updated"
                    helperText={false}
                    format={(v) => (v && v.includes('T') ? v.split('T')[0] : v)}
                    parse={(v) => (v ? v : null)}
                  />
                </Grid>
              </Grid>
            </Container>
          </FormTab>
          <FormTab label="Notes">
            <Container maxWidth="md">
              <NoteListSection entityType="PROJECT" hideTitle={true} />
            </Container>
          </FormTab>
          <FormTab label="Documents">
            <Container maxWidth="md">
              <DocumentListSection entityType="PROJECT" hideTitle={true} />
            </Container>
          </FormTab>
          <FormTab label="Activity">
            <Container maxWidth="md">
              <AuditLogSection entityType="PROJECT" />
            </Container>
          </FormTab>
        </TabbedForm>
      </Edit>
    </Container>
  );
};

export default ProjectEdit;
