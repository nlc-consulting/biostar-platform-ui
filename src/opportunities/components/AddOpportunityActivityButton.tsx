import * as React from 'react';
import { useCreate, useNotify, useRefresh, useRecordContext } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from '@mui/material';

const activityTypes = ['EMAIL', 'PHONE', 'TEXT'];

export const AddOpportunityActivityButton = () => {
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState('');
  const [type, setType] = React.useState('EMAIL');
  const [dateSent, setDateSent] = React.useState(new Date().toISOString().split('T')[0]);

  const [create, { isLoading }] = useCreate();
  const notify = useNotify();
  const refresh = useRefresh();
  const record = useRecordContext();

  const handleSave = () => {
    create(
      'opportunity-activities',
      {
        data: {
          opportunityId: record?.id,
          type,
          note,
          dateSent: new Date(dateSent)
        }
      },
      {
        onSuccess: () => {
          notify('Activity added', { type: 'info' });
          setOpen(false);
          refresh();
        },
        onError: () => {
          notify('Error adding activity', { type: 'warning' });
        }
      }
    );
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} size="small" variant="outlined">
        Add Activity
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Activity</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Type"
            margin="normal"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {activityTypes.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Note"
            margin="normal"
            multiline
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <TextField
            fullWidth
            label="Date Sent"
            margin="normal"
            type="date"
            value={dateSent}
            onChange={(e) => setDateSent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
