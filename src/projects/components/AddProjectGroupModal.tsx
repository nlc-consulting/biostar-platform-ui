import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Typography
} from '@mui/material';
import { useNotify, useRefresh, useGetList } from 'react-admin';
import { Autocomplete } from '@mui/material';
import { getErrorMessage } from '../../utils/helperUtils.ts';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';

interface Props {
  projectId: number;
}

const AddProjectGroupModal: React.FC<Props> = ({ projectId }) => {
  const [open, setOpen] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | ''>('');
  const notify = useNotify();
  const refresh = useRefresh();

  const { data: groups = [], isLoading: loadingGroups } = useGetList('groups', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'name', order: 'ASC' },
    filter: {}
  });

  const handleAddGroup = async () => {
    if (!selectedGroupId) {
      notify('Please select a group', { type: 'warning' });
      return;
    }

    try {
      await authFetchJson(`${API_BASE_URL}/projects/add-group/${projectId}`, {
        method: 'POST',
        body: JSON.stringify({ groupId: selectedGroupId }),
        headers: new Headers({ 'Content-Type': 'application/json' })
      });

      notify('Group contacts added to project');
      refresh();
      setOpen(false);
      setSelectedGroupId('');
    } catch (error) {
      notify(`Error: ${getErrorMessage(error)}`, { type: 'error' });
    }
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Add Group
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Group to Project</DialogTitle>
        <DialogContent>
          <Autocomplete
            fullWidth
            options={groups}
            getOptionLabel={(group) => group.name}
            loading={loadingGroups}
            onChange={(_, value) => setSelectedGroupId(value?.id || '')}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Group"
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingGroups ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Contacts already in the project will be skipped.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddGroup} variant="contained">
            Add Group
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProjectGroupModal;
