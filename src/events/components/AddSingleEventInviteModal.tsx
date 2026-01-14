/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
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
import { useCreate, useGetList, useNotify, useRecordContext, useRefresh } from 'react-admin';

export const AddSingleEventInviteModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  const notify = useNotify();
  const refresh = useRefresh();
  const event = useRecordContext();

  const { data: contacts = [], isLoading: loadingContacts } = useGetList('contacts', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'lastName', order: 'ASC' },
    filter: { q: search }
  });

  const [create, { isLoading }] = useCreate();

  if (!event?.id) return null;

  const handleAdd = () => {
    if (!selectedContact?.id) {
      notify('Select a contact', { type: 'warning' });
      return;
    }

    create(
      'group-event-invites',
      {
        data: {
          eventId: event.id,
          contactId: selectedContact.id,
          attended: null,
          registered: null
        }
      },
      {
        onSuccess: () => {
          notify('Contact added to event', { type: 'success' });
          setOpen(false);
          setSelectedContact(null);
          refresh();
        },
        onError: (err) => {
          notify(typeof err === 'string' ? err : 'Could not add (likely already invited)', {
            type: 'error'
          });
        }
      }
    );
  };

  return (
    <Box>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Invite Contact
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Contact to Event</DialogTitle>
        <DialogContent>
          <Autocomplete
            fullWidth
            options={contacts}
            getOptionLabel={(opt) =>
              opt.firstName && opt.lastName ? `${opt.firstName} ${opt.lastName}` : ''
            }
            value={selectedContact}
            onChange={(_, val) => setSelectedContact(val)}
            onInputChange={(_, val) => setSearch(val)}
            loading={loadingContacts}
            isOptionEqualToValue={(opt, val) => opt.id === val.id}
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
            variant="contained"
            onClick={handleAdd}
            disabled={isLoading || !selectedContact?.id}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
