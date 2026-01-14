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
  Autocomplete,
  CircularProgress
} from '@mui/material';

const AddReferredToContact = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedContact, setSelectedContact] = React.useState<any | null>(null);
  const notify = useNotify();
  const refresh = useRefresh();
  const [create, { isLoading }] = useCreate();
  const toContact = useRecordContext();

  const { data: contacts = [], isLoading: loadingContacts } = useGetList('contacts', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'lastName', order: 'ASC' },
    filter: { q: search }
  });

  const handleAdd = () => {
    if (!selectedContact.id || !toContact?.id) {
      notify('Select a contact to add', { type: 'warning' });
      return;
    }

    create(
      'referredTo',
      {
        data: {
          contactId: selectedContact.id,
          toContactId: toContact.id
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
    <Box mt={2}>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Add Referral
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Refer a Contact</DialogTitle>
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

export default AddReferredToContact;
