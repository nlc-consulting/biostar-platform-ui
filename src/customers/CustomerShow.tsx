import React from 'react';
import { Show, Tab, TabbedShowLayout, WithRecord } from 'react-admin';
import { Container, Divider, Grid, Typography } from '@mui/material';
import FieldRow from '../components/FieldRow.tsx';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';
import { NoteListSection } from '../components/notes/NoteListSection.tsx';
import { DocumentListSection } from '../components/documents/DocumentListSection.tsx';
import CustomerProjectsSection from './components/CustomerProjectsSection.tsx';

const CustomerShow: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Customers', to: '/customers' },
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
                      <FieldRow label="Primary Phone" value={record?.primaryPhone} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow label="Primary Email" value={record?.primaryEmail} />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Primary Address
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                      <FieldRow label="Street" value={record?.primaryStreet} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FieldRow label="City" value={record?.primaryCity} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <FieldRow label="State" value={record?.primaryState} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                      <FieldRow label="ZIP" value={record?.primaryZip} />
                    </Grid>
                  </Grid>
                </Container>
              )}
            />
          </Tab>
          <Tab label="Projects">
            <Container maxWidth="md">
              <CustomerProjectsSection />
            </Container>
          </Tab>
          <Tab label="Notes">
            <Container maxWidth="md">
              <NoteListSection entityType="CUSTOMER" hideTitle={true} />
            </Container>
          </Tab>
          <Tab label="Documents">
            <Container maxWidth="md">
              <DocumentListSection entityType="CUSTOMER" hideTitle={true} />
            </Container>
          </Tab>
        </TabbedShowLayout>
      </Show>
    </Container>
  );
};

export default CustomerShow;
