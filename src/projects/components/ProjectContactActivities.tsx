import {
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  DeleteButton,
  useRecordContext
} from 'react-admin';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { ConditionalFollowUpDateField } from '../../components/ConditionalFollowUpDateField.tsx';
import { EditActivityButton } from '../../components/EditActivityButton.tsx';
import { AddActivityButton } from '../../components/AddActivityButton.tsx';

const ProjectContactActivities = () => {
  const record = useRecordContext();

  if (!record?.id) return null;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle1" gutterBottom>
          Activity
        </Typography>
        <ReferenceManyField
          label="Activities"
          reference="project-contact-activities"
          target="projectContactId"
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
              keyName={'projectContactId'}
              resource={'project-contact-activities'}
            />
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
          <AddActivityButton keyName={'projectContactId'} resource={'project-contact-activities'} />
        </Box>
      </Grid>
      <Divider sx={{ marginBottom: 2 }} />
    </Grid>
  );
};

export default ProjectContactActivities;
