import React, { useState } from 'react';
import { useCreate, useNotify, useRedirect, useRefresh } from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box
} from '@mui/material';
import ContactQuickAdd from '../../components/ra-forms/ContactQuickAdd.tsx';
import { ContactAutocomplete } from '../../components/ContactAutocomplete.tsx';

interface Props {
  groupId: number;
}

const AddGroupEventModal: React.FC<Props> = ({ groupId }) => {
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [speakerId, setSpeakerId] = useState<number | null>(null);
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [topic, setTopic] = useState('');

  const notify = useNotify();
  const refresh = useRefresh();
  const [create, { isLoading }] = useCreate();

  const redirect = useRedirect();

  const handleSave = () => {
    if (!eventName || !eventDate) {
      notify('Event name and date are required', { type: 'warning' });
      return;
    }

    create(
      'group-events',
      {
        data: {
          groupId,
          eventName,
          speakerId,
          eventDate,
          location,
          topic
        }
      },
      {
        onSuccess: (data) => {
          notify('Event added');
          redirect(`/group-events/${data.id}`);
          refresh();
          setOpen(false);
          setEventName('');
          setSpeakerId(null);
          setEventDate('');
        },
        onError: () => notify('Error creating event', { type: 'error' })
      }
    );
  };

  return (
    <>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Add Event
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Event Name"
                margin="normal"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Location"
                margin="normal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <ContactAutocomplete
                  value={speakerId}
                  onChange={(id) => setSpeakerId(id)}
                  label="Speaker"
                />
                <ContactQuickAdd onValueSet={(id) => setSpeakerId(id)} />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Topic"
                margin="normal"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Event Date"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </Grid>
          </Grid>
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

export default AddGroupEventModal;
