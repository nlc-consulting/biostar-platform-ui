import React from 'react';
import { Show, Tab, TabbedShowLayout, WithRecord } from 'react-admin';
import { Container, Divider, Grid, Typography } from '@mui/material';
import { formatCurrency, formatDate } from '../utils/helperUtils.ts';
import FieldRow from '../components/FieldRow.tsx';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';
import { NoteListSection } from '../components/notes/NoteListSection.tsx';
import { DocumentListSection } from '../components/documents/DocumentListSection.tsx';
import AuditLogSection from '../components/audit/AuditLogSection.tsx';

const ProjectShow: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: 'View' }
        ]}
      />
      <Show>
        <TabbedShowLayout syncWithLocation={false}>
          <Tab label="Details">
            <WithRecord
              render={(record) => (
                <Container maxWidth="md">
                  <Typography variant="h6" gutterBottom>
                    Project Overview
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow label="Project Name" value={record?.name} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow label="Status" value={record?.status} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FieldRow
                        label="Customer"
                        value={
                          record?.customer
                            ? `${record.customer.firstName ?? ''} ${record.customer.lastName ?? ''}`.trim()
                            : null
                        }
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Property Address
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <FieldRow label="Street" value={record?.propertyStreet} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow label="City" value={record?.propertyCity} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <FieldRow label="State" value={record?.propertyState} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <FieldRow label="ZIP" value={record?.propertyZip} />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Project Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow label="Type of Loss" value={record?.lossType} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FieldRow label="Issue Description" value={record?.description} />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FieldRow label="Emergency" value={record?.isEmergency ? 'Yes' : 'No'} />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Insurance Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow label="Insurance Carrier" value={record?.insuranceCarrier} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow label="Policy Number" value={record?.policyNumber} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow label="Claim Number" value={record?.claimNumber} />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Adjusters
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FieldRow label="Primary Adjuster" value={record?.primaryAdjusterName} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FieldRow label="Primary Adjuster Phone" value={record?.primaryAdjusterPhone} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FieldRow label="Primary Adjuster Email" value={record?.primaryAdjusterEmail} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FieldRow label="Third-Party Adjuster" value={record?.thirdPartyAdjusterName} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FieldRow
                        label="Third-Party Adjuster Phone"
                        value={record?.thirdPartyAdjusterPhone}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <FieldRow
                        label="Third-Party Adjuster Email"
                        value={record?.thirdPartyAdjusterEmail}
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Inspection & Estimate
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow
                        label="Scheduled Inspection"
                        value={formatDate(record?.scheduledInspectionAt)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow
                        label="Estimate Total"
                        value={formatCurrency(record?.estimateTotal)}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow
                        label="Estimate Updated"
                        value={formatDate(record?.estimateTotalUpdatedAt)}
                      />
                    </Grid>
                  </Grid>
                </Container>
              )}
            />
          </Tab>
          <Tab label="Notes">
            <Container maxWidth="md">
              <NoteListSection entityType="PROJECT" hideTitle={true} />
            </Container>
          </Tab>
          <Tab label="Documents">
            <Container maxWidth="md">
              <DocumentListSection entityType="PROJECT" hideTitle={true} />
            </Container>
          </Tab>
          <Tab label="Activity">
            <Container maxWidth="md">
              <AuditLogSection entityType="PROJECT" />
            </Container>
          </Tab>
        </TabbedShowLayout>
      </Show>
    </Container>
  );
};

export default ProjectShow;
