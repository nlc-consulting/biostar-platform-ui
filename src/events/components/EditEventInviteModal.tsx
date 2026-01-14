import React, { useState } from 'react';
import { useUpdate, useNotify, useRefresh, useRecordContext } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditEventInviteModal: React.FC<Props> = ({ open, setOpen }) => {
  const record = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();
  const [update, { isLoading }] = useUpdate();

  // null allowed in state
  const [registered, setRegistered] = useState<boolean | null>(record?.registered ?? null);
  const [attended, setAttended] = useState<boolean | null>(record?.attended ?? null);

  if (!record) return null;

  const handleSave = () => {
    update(
      'group-event-invites',
      { id: record.id, data: { registered, attended } },
      {
        onSuccess: () => {
          notify('Invite updated', { type: 'success' });
          refresh();
          setOpen(false);
        },
        onError: () => notify('Error updating invite', { type: 'error' })
      }
    );
  };

  // Helpers to convert null <-> empty string for MUI Select
  const normalize = (val: boolean | null) => (val === null ? '' : val);
  const denormalize = (val: string | boolean) => (val === '' ? null : val === 'true');

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)}>
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Edit Invite</DialogTitle>

        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Registered</InputLabel>
            <Select
              label="Registered"
              value={normalize(registered)}
              onChange={(e) => setRegistered(denormalize(e.target.value))}
            >
              <MenuItem value="">Unset</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Attended</InputLabel>
            <Select
              label="Attended"
              value={normalize(attended)}
              onChange={(e) => setAttended(denormalize(e.target.value))}
            >
              <MenuItem value="">Unset</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={isLoading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditEventInviteModal;
