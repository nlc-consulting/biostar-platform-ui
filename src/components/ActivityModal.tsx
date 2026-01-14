import * as React from 'react';
import { useCreate, useUpdate, useNotify, useRefresh, useRecordContext } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox
} from '@mui/material';

export const ActivityModal = ({
  open,
  setOpen,
  initialRecord,
  resource,
  keyName,
  onSaved
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialRecord?: any;
  resource: string;
  keyName: string;
  onSaved?: () => void;
}) => {
  const recordContext = useRecordContext();
  const notify = useNotify();
  const refresh = useRefresh();

  const [create, { isLoading: creating }] = useCreate();
  const [update, { isLoading: updating }] = useUpdate();
  const isEdit = !!initialRecord;

  const [type, setType] = React.useState(initialRecord?.type || 'TASK');
  const [note, setNote] = React.useState(initialRecord?.note || '');
  const [dateSent, setDateSent] = React.useState(
    initialRecord?.dateSent
      ? new Date(initialRecord.dateSent).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [followUpDate, setFollowUpDate] = React.useState(
    initialRecord?.followUpDate
      ? new Date(initialRecord.followUpDate).toISOString().split('T')[0]
      : ''
  );
  const [followUpCleared, setFollowUpCleared] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setType(initialRecord?.type || 'TYPE');
      setNote(initialRecord?.note || '');
      setDateSent(
        initialRecord?.dateSent
          ? new Date(initialRecord.dateSent).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
      );
      setFollowUpDate(
        initialRecord?.followUpDate
          ? new Date(initialRecord.followUpDate).toISOString().split('T')[0]
          : ''
      );
      setFollowUpCleared(false);
    }
  }, [open, initialRecord]);

  const handleSave = () => {
    const payload = {
      type,
      note,
      dateSent: new Date(dateSent),
      followUpDate: followUpDate ? new Date(followUpDate) : undefined
    };

    if (isEdit) {
      update(
        resource,
        {
          id: initialRecord.id,
          data: {
            ...payload,
            followUpCleared
          },
          previousData: initialRecord
        },
        {
          onSuccess: () => {
            notify('Activity updated', { type: 'info' });
            setOpen(false);
            refresh();
            onSaved?.();
          },
          onError: () => {
            notify('Error updating activity', { type: 'warning' });
          }
        }
      );
    } else {
      create(
        resource,
        {
          data: {
            ...payload,
            [keyName]: recordContext?.id
          }
        },
        {
          onSuccess: () => {
            notify('Activity added', { type: 'info' });
            setOpen(false);
            refresh();
            onSaved?.();
          },
          onError: () => {
            notify('Error adding activity', { type: 'warning' });
          }
        }
      );
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Activity' : 'Add Activity'}</DialogTitle>
      <DialogContent>
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
          label="Activity Date"
          margin="normal"
          type="date"
          value={dateSent}
          onChange={(e) => setDateSent(e.target.value)}
        />
        <TextField
          fullWidth
          label="Follow Up Date"
          type="date"
          margin="normal"
          value={followUpDate}
          onChange={(e) => setFollowUpDate(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />

        {isEdit && !initialRecord.followedUpOn && (
          <FormControlLabel
            control={
              <Checkbox
                checked={followUpCleared}
                onChange={(e) => setFollowUpCleared(e.target.checked)}
              />
            }
            label="Mark follow-up as cleared"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} disabled={creating || updating}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={creating || updating} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
