import { useCreate, useNotify, useRefresh, useRecordContext, useGetList } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Autocomplete
} from '@mui/material';
import { useState } from 'react';

const AddOpportunityQuick = () => {
  const [open, setOpen] = useState(false);
  const [programId, setProgramId] = useState<number | null>(null);
  const [programServiceId, setProgramServiceId] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const notify = useNotify();
  const refresh = useRefresh();
  const contact = useRecordContext();
  const [create, { isLoading }] = useCreate();

  const { data: programs = [] } = useGetList('programs', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'name', order: 'ASC' }
  });

  const { data: services = [] } = useGetList('program-services', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'name', order: 'ASC' },
    filter: programId ? { programId } : {}
  });

  const handleSave = () => {
    if (!contact?.id || !programId || !programServiceId) {
      notify('All fields are required', { type: 'warning' });
      return;
    }

    create(
      'opportunities',
      {
        data: {
          contactId: contact.id,
          status: 'OPEN',
          opportunityStageId: 1,
          programId,
          programServiceId,
          dateOpened: new Date().toISOString(),
          notes
        }
      },
      {
        onSuccess: () => {
          notify('Opportunity created', { type: 'success' });
          refresh();
          setOpen(false);
          setProgramId(null);
          setProgramServiceId(null);
          setNotes('');
        },
        onError: (error) => {
          notify(
            error instanceof Error ? `Error: ${error.message}` : 'An unexpected error occurred',
            { type: 'error' }
          );
        }
      }
    );
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Add Opportunity
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Quick Add Opportunity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Autocomplete
                options={programs}
                getOptionLabel={(option) => option.name}
                value={programs.find((p) => p.id === programId) || null}
                onChange={(_, value) => {
                  setProgramId(value?.id || null);
                  setProgramServiceId(null); // Clear dependent field
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Program" margin="normal" fullWidth />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Autocomplete
                options={services}
                getOptionLabel={(option) => option.name}
                value={services.find((s) => s.id === programServiceId) || null}
                onChange={(_, value) => {
                  setProgramServiceId(value?.id || null);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Service" margin="normal" fullWidth />
                )}
                disabled={!programId}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !programId || !programServiceId}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddOpportunityQuick;
