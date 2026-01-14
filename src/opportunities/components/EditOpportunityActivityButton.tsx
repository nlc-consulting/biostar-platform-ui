import * as React from 'react';
import { useUpdate, useNotify, useRefresh, useRecordContext } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from '@mui/material';

const activityTypes = ['EMAIL', 'PHONE', 'TEXT', 'NOTE', 'MEETING'];

export const EditOpportunityActivityButton = () => {
  const record = useRecordContext();
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState(record?.note || '');
  const [type, setType] = React.useState(record?.type || 'EMAIL');
  const [dateSent, setDateSent] = React.useState(() =>
    record?.dateSent
      ? new Date(record.dateSent).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [update, { isLoading }] = useUpdate();
  const notify = useNotify();
  const refresh = useRefresh();

  console.log(record);

  const handleSave = () => {
    update(
      'opportunity-activities',
      {
        id: record?.id,
        data: {
          opportunityId: record?.opportunityId,
          type,
          note,
          dateSent
        },
        previousData: record
      },
      {
        onSuccess: () => {
          notify('Activity updated', { type: 'info' });
          setOpen(false);
          refresh();
        },
        onError: () => {
          notify('Error updating activity', { type: 'warning' });
        }
      }
    );
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="small"
        variant="outlined"
        style={{ marginLeft: 8 }}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Activity</DialogTitle>
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
