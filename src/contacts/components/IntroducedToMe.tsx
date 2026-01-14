import { Divider, Grid, Typography } from '@mui/material';
import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  ReferenceManyField,
  TextField,
  useRecordContext
} from 'react-admin';
import AddIntroducedByContact from './AddIntroducedByContact.tsx';

export const IntroducedToMe = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <Grid size={{ xs: 12 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        Introduced to me:
      </Typography>
      <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic' }}>
        These are people {record?.firstName} introduced you to.
      </Typography>
      <ReferenceManyField label="Referred To" reference="introduced-by" target="id">
        <Datagrid bulkActionButtons={false} empty={<small>No introductions yet.</small>}>
          <TextField source="firstName" />
          <TextField source="lastName" />
          <DateField source="dateIntroduced" showTime={false} />
          <DeleteWithConfirmButton
            mutationMode="pessimistic" // optional, but explicit
            label=""
            confirmTitle="Remove Introduction"
            confirmContent="Are you sure you want to remove this introduction?"
            redirect={false}
          />
        </Datagrid>
      </ReferenceManyField>
      <AddIntroducedByContact />
      <Divider sx={{ marginTop: 2 }} />
    </Grid>
  );
};
