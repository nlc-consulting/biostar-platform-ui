import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCreate, useGetOne, useNotify, useRecordContext } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { getErrorMessage } from '../../utils/helperUtils.ts';

interface Props {
  setValueField?: string; // field name RA should update
  onValueSet?: (id: number) => void; // standalone callback if not inside RA form
  onContactCreated?: (contact: { id: number; firstName: string; lastName: string }) => void;
  simple?: boolean;
  companyId?: number | undefined;
}

const ContactQuickAdd: React.FC<Props> = ({
  setValueField,
  onValueSet,
  onContactCreated,
  companyId,
  simple = true
}) => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [create, { isLoading }] = useCreate();
  const notify = useNotify();
  const { setValue: formSetValue } = useFormContext();

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) return;
    const companyAddress = {
      primaryStreet: company?.primaryStreet,
      primaryCity: company?.primaryCity,
      primaryState: company?.primaryState,
      primaryZip: company?.primaryZip
    };

    create(
      'contacts',
      {
        data: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          companyId,
          ...(companyAddress || {})
        }
      },
      {
        onSuccess: (data) => {
          notify('Contact created', { type: 'info' });

          // Case 1: used inside RA form
          if (setValueField && formSetValue) {
            formSetValue(setValueField, data.id, { shouldDirty: true, shouldValidate: true });
          }

          // Case 2: used inside standalone modal
          if (onValueSet) {
            onValueSet(data.id);
          }

          if (onContactCreated) onContactCreated(data);

          setOpen(false);
          setFirstName('');
          setLastName('');
        },
        onError: (error) => {
          notify(`Error: ${getErrorMessage(error)}`, { type: 'error' });
        }
      }
    );
  };

  const company = useRecordContext();
  // fallback if used standalone
  useGetOne('companies', { id: companyId });

  return (
    <>
      {simple ? (
        <IconButton color="success" onClick={() => setOpen(true)}>
          <AddIcon />
        </IconButton>
      ) : (
        <Button onClick={() => setOpen(true)} size="small" variant="outlined">
          Create Contact
        </Button>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Quick Add Contact</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                autoFocus
                margin="normal"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                autoFocus
                margin="normal"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!firstName.trim() || !lastName.trim() || isLoading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactQuickAdd;
