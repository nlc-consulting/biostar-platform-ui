import { Divider, Grid, Typography } from '@mui/material';
import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  ReferenceManyField,
  TextField,
  useRecordContext
} from 'react-admin';
import AddReferredToContact from './AddReferredToContact.tsx';

export const ReferredTo = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <Grid size={{ xs: 12 }}>
      <Grid container spacing={2} mb={2}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Referred to:
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic' }}>
            These are people you referred {record?.firstName} to.
          </Typography>
          <ReferenceManyField label="Referred To" reference="referredTo" target="id">
            <Datagrid bulkActionButtons={false} empty={<small>No referrals yet.</small>}>
              <TextField source="firstName" />
              <TextField source="lastName" />
              <DateField source="dateReferred" showTime={false} />
              <DeleteWithConfirmButton
                mutationMode="pessimistic" // optional, but explicit
                label=""
                confirmTitle="Remove Referral"
                confirmContent="Are you sure you want to remove this referral?"
                redirect={false}
              />
            </Datagrid>
          </ReferenceManyField>
          <AddReferredToContact />
        </Grid>
      </Grid>
      <Divider sx={{ marginBottom: 2 }} />
    </Grid>
  );
};
