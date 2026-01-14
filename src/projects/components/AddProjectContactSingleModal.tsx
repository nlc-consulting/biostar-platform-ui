import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  CircularProgress,
  Autocomplete
} from '@mui/material';
import { useNotify, useRefresh, useGetList, useCreate } from 'react-admin';
import { ProjectContactStage } from '../../types/ProjectContactStage.ts';
interface Props {
  projectId: number;
}

const AddProjectContactSingleModal: React.FC<Props> = ({ projectId }) => {
  const [open, setOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<number | ''>('');
  const [stage, setStage] = useState<ProjectContactStage>(ProjectContactStage.INITIAL);
  const [create] = useCreate();

  const notify = useNotify();
  const refresh = useRefresh();

  const { data: contacts = [], isLoading: loadingContacts } = useGetList('contacts', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'lastName', order: 'ASC' }
  });

  const handleAdd = () => {
    if (!selectedContactId || !projectId) {
      notify('Select a contact to add', { type: 'warning' });
      return;
    }

    create(
      'project-contacts',
      {
        data: {
          contactId: selectedContactId,
          projectId: projectId,
          stage: stage
        }
      },
      {
        onSuccess: () => {
          notify('Contact added to project');
          refresh();
          setOpen(false);
          setSelectedContactId('');
        },
        onError: (error) => {
          if (error instanceof Error) {
            notify(`Error: ${error.message}`, { type: 'error' });
          } else {
            notify('An unexpected error occurred', { type: 'error' });
          }
        }
      }
    );
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Add Contact
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Contact to Project</DialogTitle>
        <DialogContent>
          <Autocomplete
            fullWidth
            options={contacts}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            loading={loadingContacts}
            onChange={(_, value) => setSelectedContactId(value?.id || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Contact"
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingContacts ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="stage-label">Stage</InputLabel>
            <Select
              labelId="stage-label"
              value={stage}
              onChange={(e) => setStage(e.target.value as ProjectContactStage)}
              label="Stage"
            >
              {['INITIAL', 'ENGAGED', 'MAYBE', 'YES', 'LOST'].map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProjectContactSingleModal;
