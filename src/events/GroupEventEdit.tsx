import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  useNotify,
  useRedirect,
  useEditController
} from 'react-admin';
import {
  Container,
  Divider,
  Grid,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Box
} from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { FloatingToolbar } from '../components/FloatingToolbar';
import { PaginatedEventInvites } from './components/PaginatedEventInvites.tsx';
import { AddSingleEventInviteModal } from './components/AddSingleEventInviteModal.tsx';
import { EntitySelect } from '../components/ra-forms/EntitySelect.tsx';
import ContactQuickAdd from '../components/ra-forms/ContactQuickAdd.tsx';

const GroupEventEdit: React.FC = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const controller = useEditController();
  const record = controller.record;

  return (
    <Container maxWidth="md">
      {record && record.group && (
        <Breadcrumbs sx={{ mt: 2 }}>
          <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
            Dashboard
          </MuiLink>

          <MuiLink
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={`/groups/${record.groupId}`}
          >
            {record.group.name}
          </MuiLink>

          <Typography color="text.primary">Event</Typography>
        </Breadcrumbs>
      )}

      <Edit
        mutationMode="pessimistic"
        mutationOptions={{
          onSuccess: (data) => {
            notify('Event updated', { type: 'success' });
            redirect(`/groups/${data.groupId}`);
          },
          onError: () => {
            notify('Save failed', { type: 'error' });
          }
        }}
      >
        <SimpleForm>
          <FloatingToolbar />

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput source="eventName" label="Event Name" fullWidth helperText={false} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput source="location" label="Location" fullWidth helperText={false} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box display="flex" alignItems="center" gap={1}>
                <EntitySelect
                  source="speakerId"
                  reference="contacts"
                  label="Speaker"
                  optionText={(r) => `${r.firstName} ${r.lastName}`}
                />
                <ContactQuickAdd setValueField="speakerId" />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextInput source="topic" label="Topic" fullWidth helperText={false} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <DateInput
                source="eventDate"
                label="Event Date"
                helperText={false}
                format={(v) => (v && v.includes('T') ? v.split('T')[0] : v)}
                parse={(v) => (v ? v : null)}
              />
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="subtitle1" gutterBottom>
            Invited Contacts
          </Typography>

          <Box mb={2} display="flex" gap={2} justifyContent="flex-end">
            <AddSingleEventInviteModal />
          </Box>

          <PaginatedEventInvites />
        </SimpleForm>
      </Edit>
    </Container>
  );
};

export default GroupEventEdit;
