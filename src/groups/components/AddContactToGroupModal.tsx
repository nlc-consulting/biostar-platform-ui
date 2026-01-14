import * as React from 'react';
import { useCreate, useNotify, useRefresh, useRecordContext, useGetList } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Autocomplete
} from '@mui/material';

const AddContactToReferredToModal = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedContact, setSelectedContact] = React.useState<any | null>(null);
  const [dateAdded, setDateAdded] = React.useState(new Date().toISOString().split('T')[0]);
  const notify = useNotify();
  const refresh = useRefresh();
  const [create, { isLoading }] = useCreate();
  const group = useRecordContext();

  const { data: contacts = [], isLoading: loadingContacts } = useGetList('contacts', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'lastName', order: 'ASC' },
    filter: { q: search }
  });

  const handleAdd = () => {
    if (!selectedContact.id || !group?.id) {
      notify('Select a contact to add', { type: 'warning' });
      return;
    }

    create(
      'group-contacts',
      {
        data: {
          contactId: selectedContact.id,
          groupId: group.id,
          dateAdded: dateAdded ? new Date(dateAdded).toISOString() : null
        }
      },
      {
        onSuccess: () => {
          notify('Contact successfully linked');
          refresh();
          setOpen(false);
          setSelectedContact(null);
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
    <Box>
      <Button variant="contained" size="small" onClick={() => setOpen(true)}>
        Add Contact
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Contact</DialogTitle>
        <DialogContent>
          <Autocomplete
            fullWidth
            options={contacts}
            getOptionLabel={(option) =>
              option.firstName && option.lastName ? `${option.firstName} ${option.lastName}` : ''
            }
            value={selectedContact}
            onChange={(_, value) => setSelectedContact(value)}
            onInputChange={(_, value) => setSearch(value)}
            loading={loadingContacts}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Contact"
                margin="normal"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingContacts ? <CircularProgress size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
          <TextField
            fullWidth
            type="date"
            label="Date Added"
            margin="normal"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            disabled={isLoading || !selectedContact?.id}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddContactToReferredToModal;
