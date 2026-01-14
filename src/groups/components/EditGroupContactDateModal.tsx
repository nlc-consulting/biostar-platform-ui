import React, { useState } from 'react';
import { useUpdate, useNotify, useRefresh, useRecordContext } from 'react-admin';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField
} from '@mui/material';
import { getErrorMessage } from '../../utils/helperUtils.ts';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

const EditGroupContactDateModal: React.FC = () => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(record?.dateAdded?.split('T')[0] ?? '');

  const notify = useNotify();
  const refresh = useRefresh();
  const [update, { isLoading }] = useUpdate();

  if (!record) return null;

  const handleSave = () => {
    update(
      'group-contacts',
      { id: record.id, data: { dateAdded: date } },
      {
        onSuccess: () => {
          notify('Date updated');
          setOpen(false);
          refresh();
        },
        onError: (error) => {
          notify(`Error: ${getErrorMessage(error)}`, { type: 'error' });
        }
      }
    );
  };

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)} aria-label="Edit date added">
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Edit Date Added</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            fullWidth
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label="Date Added"
            InputLabelProps={{ shrink: true }}
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

export default EditGroupContactDateModal;
