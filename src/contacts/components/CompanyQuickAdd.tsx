import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCreate, useNotify } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { getErrorMessage } from '../../utils/helperUtils.ts';

const CompanyQuickAdd: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [create, { isLoading }] = useCreate();
  const notify = useNotify();
  const { setValue } = useFormContext(); // ✅ Access form to update `companyId`

  const handleSave = () => {
    if (!companyName.trim()) return;
    create(
      'companies',
      { data: { name: companyName.trim() } },
      {
        onSuccess: (data) => {
          notify('Company created', { type: 'info' });
          setValue('companyId', data.id, { shouldDirty: true, shouldValidate: true });
          setOpen(false);
          setCompanyName('');
        },
        onError: (error) => {
          notify(`Error: ${getErrorMessage(error)}`, { type: 'error' });
        }
      }
    );
  };

  return (
    <>
      <IconButton color="success" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Company</DialogTitle>
        <DialogContent>
          <TextField
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            fullWidth
            autoFocus
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!companyName.trim() || isLoading}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompanyQuickAdd;
