import React from 'react';
import { Show, SimpleShowLayout, WithRecord } from 'react-admin';
import { Container, Divider, Grid, Typography } from '@mui/material';
import { formatCurrency, formatDate } from '../utils/helperUtils.ts';
import FieldRow from '../components/FieldRow.tsx';

const LeadShow: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Show>
        <SimpleShowLayout>
          <WithRecord
            render={(record) => (
              <Container maxWidth="md">
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldRow label="First Name" value={record?.firstName} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldRow label="Last Name" value={record?.lastName} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldRow label="Phone" value={record?.phone} />
                  </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FieldRow label="Email" value={record?.email} />
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
              Lead Details
            </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldRow label="Lead Source" value={record?.leadSource} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldRow label="Received" value={formatDate(record?.receivedAt)} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldRow label="Type of Loss" value={record?.lossType} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FieldRow label="Status" value={record?.status} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FieldRow label="Issue Description" value={record?.description} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FieldRow
                      label="Emergency"
                      value={record?.isEmergency ? 'Yes' : 'No'}
                    />
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
                    <FieldRow
                      label="Primary Adjuster Phone"
                      value={record?.primaryAdjusterPhone}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FieldRow
                      label="Primary Adjuster Email"
                      value={record?.primaryAdjusterEmail}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <FieldRow
                      label="Third-Party Adjuster"
                      value={record?.thirdPartyAdjusterName}
                    />
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

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Notes
                </Typography>
                <Typography variant="body1">{record?.notes ?? '-'}</Typography>
              </Container>
            )}
          />
        </SimpleShowLayout>
      </Show>
    </Container>
  );
};

export default LeadShow;
