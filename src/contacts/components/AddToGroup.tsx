import { useCreate, useNotify, useRefresh, useRecordContext, useGetList } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Autocomplete,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';

const AddToGroup = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const notify = useNotify();
  const refresh = useRefresh();
  const [create, { isLoading }] = useCreate();
  const contact = useRecordContext();

  const { data: groups = [], isLoading: isLoadingGroups } = useGetList('groups', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'name', order: 'ASC' },
    filter: { q: search, includeSubgroups: true }
  });

  const handleAdd = () => {
    if (!selectedGroup.id || !contact?.id) {
      notify('Select a group to add', { type: 'warning' });
      return;
    }

    create(
      'group-contacts',
      {
        data: {
          groupId: selectedGroup.id,
          contactId: contact.id
        }
      },
      {
        onSuccess: () => {
          notify('Contact successfully added to Group');
          refresh();
          setOpen(false);
          setSelectedGroup(null);
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
    <Box mt={2}>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Add to Group
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Contact to Group</DialogTitle>
        <DialogContent>
          <Autocomplete
            fullWidth
            options={groups}
            getOptionLabel={(option) => option.name}
            value={selectedGroup}
            onChange={(_, value) => setSelectedGroup(value)}
            onInputChange={(_, value) => setSearch(value)}
            loading={isLoadingGroups}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Group"
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoadingGroups ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={isLoading || !selectedGroup?.id}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddToGroup;
