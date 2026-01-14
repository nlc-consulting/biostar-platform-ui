import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material';
import { useCreate, useNotify, useRefresh } from 'react-admin';
import { getErrorMessage } from '../../../utils/helperUtils.ts';

interface Props {
  parentId: number;
  onAdded?: () => void;
}

const AddSubgroupModal: React.FC<Props> = ({ parentId, onAdded }) => {
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const notify = useNotify();
  const refresh = useRefresh();
  const [create, { isLoading }] = useCreate();

  const handleAdd = () => {
    if (!groupName.trim()) {
      notify('Please enter a group name', { type: 'warning' });
      return;
    }

    create(
      'groups',
      {
        data: {
          // tenantId: 1,
          name: groupName.trim(),
          parentId
        }
      },
      {
        onSuccess: () => {
          notify('Subgroup created');
          refresh();
          setOpen(false);
          setGroupName('');
          onAdded?.();
        },
        onError: (error) => {
          const message = getErrorMessage(error);
          notify(message, { type: 'error' });
        }
      }
    );
  };

  return (
    <Box>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Add Subgroup
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>New Subgroup</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={isLoading || !groupName.trim()} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddSubgroupModal;
