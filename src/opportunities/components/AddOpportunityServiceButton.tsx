import * as React from 'react';
import { useCreate, useNotify, useRefresh, useRecordContext, useGetList } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid
} from '@mui/material';

export const AddOpportunityServiceButton = () => {
  const [open, setOpen] = React.useState(false);
  const [programId, setProgramId] = React.useState('');
  const [programServiceId, setProgramServiceId] = React.useState('');

  const record = useRecordContext(); // gets the current opportunity
  const notify = useNotify();
  const refresh = useRefresh();
  const [create, { isLoading }] = useCreate();

  // Fetch program list
  const { data: programs } = useGetList('programs', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'name', order: 'ASC' }
  });

  // Fetch services based on selected program
  const { data: services } = useGetList(
    'program-services',
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'name', order: 'ASC' },
      filter: { programId: Number(programId) || 0 }
    },
    { enabled: !!programId }
  );

  const handleSave = () => {
    if (!programServiceId) {
      notify('Please select a service', { type: 'warning' });
      return;
    }

    create(
      'opportunity-services',
      {
        data: {
          opportunityId: record?.id,
          programServiceId: Number(programServiceId)
        }
      },
      {
        onSuccess: () => {
          notify('Service added', { type: 'info' });
          setOpen(false);
          setProgramId('');
          setProgramServiceId('');
          refresh();
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : JSON.stringify(error);
          notify(`Error: ${message}`, { type: 'warning' });
        }
      }
    );
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} size="small" variant="outlined">
        Add Product
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Program"
                value={programId}
                onChange={(e) => {
                  setProgramId(e.target.value);
                  setProgramServiceId(''); // reset service when program changes
                }}
              >
                {programs?.map((program) => (
                  <MenuItem key={program.id} value={program.id}>
                    {program.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                select
                fullWidth
                label="Product"
                value={programServiceId}
                onChange={(e) => setProgramServiceId(e.target.value)}
                disabled={!programId}
              >
                {services?.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !programServiceId}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
