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
import { useState } from 'react';

export const TaskModal = ({
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

  const [note, setNote] = React.useState(initialRecord?.note || '');

  const [taskDate, setTaskDate] = useState(
    initialRecord?.taskDate
      ? new Date(initialRecord.taskDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );

  const [dueDate, setDueDate] = React.useState(
    initialRecord?.dueDate ? new Date(initialRecord.dueDate).toISOString().split('T')[0] : ''
  );

  const [taskCompleted, setTaskCompleted] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setNote(initialRecord?.note || '');

      setTaskDate(
        initialRecord?.taskDate
          ? new Date(initialRecord.taskDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
      );

      setDueDate(
        initialRecord?.dueDate ? new Date(initialRecord.dueDate).toISOString().split('T')[0] : ''
      );

      setTaskCompleted(false);
    }
  }, [open, initialRecord]);

  const handleSave = () => {
    const payload = {
      note,
      taskDate: new Date(taskDate),
      dueDate: dueDate ? new Date(dueDate) : undefined
    };

    if (isEdit) {
      update(
        resource,
        {
          id: initialRecord.id,
          data: {
            ...payload,
            taskCompleted: taskCompleted
          },
          previousData: initialRecord
        },
        {
          onSuccess: () => {
            notify('Task updated', { type: 'info' });
            setOpen(false);
            refresh();
            onSaved?.();
          },
          onError: () => {
            notify('Error updating task', { type: 'warning' });
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
            notify('Task added', { type: 'info' });
            setOpen(false);
            refresh();
            onSaved?.();
          },
          onError: () => {
            notify('Error adding task', { type: 'warning' });
          }
        }
      );
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Task' : 'Add Task'}</DialogTitle>
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
          label="Task Date"
          margin="normal"
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <TextField
          fullWidth
          label="Due Date"
          type="date"
          margin="normal"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />

        {isEdit && !initialRecord.taskCompleted && (
          <FormControlLabel
            control={
              <Checkbox
                checked={taskCompleted}
                onChange={(e) => setTaskCompleted(e.target.checked)}
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
