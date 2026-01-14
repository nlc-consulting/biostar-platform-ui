import React, { useState } from 'react';
import {
  BooleanInput,
  Datagrid,
  DateField,
  DeleteButton,
  Edit,
  EditButton,
  ReferenceManyField,
  SimpleForm,
  TextField,
  TextInput,
  useEditController
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
import { ConditionalFollowUpDateField } from '../components/ConditionalFollowUpDateField.tsx';
import { EditActivityButton } from '../components/EditActivityButton.tsx';
import { AddActivityButton } from '../components/AddActivityButton.tsx';
import GroupContacts from './components/GroupContacts.tsx';
import { Link as RouterLink } from 'react-router';
import GroupTree from './components/GroupTree.tsx';
import AddSubgroupModal from './components/subgroups/AddSubgroupModal.tsx';
import { FloatingToolbar } from '../components/FloatingToolbar.tsx';
import { NoteListSection } from '../components/notes/NoteListSection.tsx';
import AddGroupEventModal from './components/AddGroupEventModal.tsx';

const GroupEdit: React.FC = () => {
  const controller = useEditController();
  const record = controller.record;
  const groupId = record?.id;
  const [refreshKey, setRefreshKey] = useState<number>(0);

  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/groups">
          Groups
        </MuiLink>
        <Typography color="text.primary">Manage</Typography>
      </Breadcrumbs>
      <Edit mutationMode={'pessimistic'}>
        <SimpleForm>
          <FloatingToolbar />
          <Container maxWidth="md">
            <Grid container spacing={2} mb={2}>
              <Grid size={{ xs: 12 }}>
                <TextInput source="name" helperText={false} />
              </Grid>

              {record?.parentId && (
                <Grid size={{ xs: 12 }}>
                  <BooleanInput
                    disabled={true}
                    source="rootIsPond"
                    label="Pond"
                    helperText={false}
                  />
                </Grid>
              )}

              {!record?.parentId && (
                <Grid size={{ xs: 12 }}>
                  <BooleanInput source="isPond" label="Pond" helperText={false} />
                </Grid>
              )}
            </Grid>
            <Divider sx={{ marginBottom: 2 }} />

            {groupId && (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  Subgroups
                </Typography>
                <GroupTree key={refreshKey} groupId={groupId} />
                <Box my={2}>
                  <AddSubgroupModal
                    parentId={groupId}
                    onAdded={() => setRefreshKey((prev) => prev + 1)}
                  />
                </Box>
                <Divider sx={{ marginBottom: 2 }} />
              </>
            )}

            <GroupContacts />
            <Divider sx={{ marginBottom: 2 }} />

            <Grid container spacing={2} mb={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant={'subtitle1'} gutterBottom>
                  Activity
                </Typography>
                <Box mb={2}>
                  <AddActivityButton keyName={'groupId'} resource={'group-activities'} />
                </Box>
                <ReferenceManyField
                  label="Activities"
                  reference="group-activities"
                  target="groupId"
                >
                  <Datagrid bulkActionButtons={false} empty={<></>}>
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
                    <EditActivityButton keyName={'groupId'} resource={'group-activities'} />
                    <DeleteButton
                      mutationMode="pessimistic"
                      redirect={false}
                      label=""
                      confirmTitle="Are you sure?"
                      confirmContent="This will remove the activiy from the group."
                    />
                  </Datagrid>
                </ReferenceManyField>
              </Grid>
            </Grid>
            <Divider sx={{ marginBottom: 2 }} />

            {/* Group Events */}
            <Divider sx={{ marginBottom: 2 }} />

            <Grid container spacing={2} mb={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Events
                </Typography>

                {/* Add Event Modal Button */}
                <Box mb={2}>
                  <AddGroupEventModal groupId={groupId} />
                </Box>

                {/* Events list */}
                <ReferenceManyField label="Events" reference="group-events" target="groupId">
                  <Datagrid bulkActionButtons={false} empty={<></>}>
                    <TextField source="eventName" label="Event" />
                    <TextField source="speaker" label="Speaker" />
                    <DateField
                      source="eventDate"
                      label="Date"
                      locales="en-US"
                      options={{ timeZone: 'UTC' }}
                    />
                    <EditButton />
                    <DeleteButton
                      mutationMode="pessimistic"
                      redirect={false}
                      label=""
                      confirmTitle="Are you sure?"
                      confirmContent="This will remove the event."
                    />
                  </Datagrid>
                </ReferenceManyField>
              </Grid>
            </Grid>

            <NoteListSection entityType="GROUP" />
            <Divider sx={{ marginY: 2 }} />
          </Container>
        </SimpleForm>
      </Edit>
    </Container>
  );
};

export default GroupEdit;
