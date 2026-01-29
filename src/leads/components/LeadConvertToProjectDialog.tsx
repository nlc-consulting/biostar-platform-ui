import React, { useEffect, useRef, useState } from 'react';
import {
  useDataProvider,
  useNotify,
  useRecordContext
} from 'react-admin';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';

type CustomerOption = {
  id: number;
  firstName: string;
  lastName: string;
  primaryEmail?: string | null;
  primaryPhone?: string | null;
};

type CustomerForm = {
  firstName: string;
  lastName: string;
  primaryEmail: string;
  primaryPhone: string;
  primaryStreet: string;
  primaryCity: string;
  primaryState: string;
  primaryZip: string;
};

const emptyCustomerForm: CustomerForm = {
  firstName: '',
  lastName: '',
  primaryEmail: '',
  primaryPhone: '',
  primaryStreet: '',
  primaryCity: '',
  primaryState: '',
  primaryZip: ''
};

const LeadConvertToProjectDialog: React.FC = () => {
  const lead = useRecordContext();
  const notify = useNotify();
  const navigate = useNavigate();
  const dataProvider = useDataProvider();
  const [open, setOpen] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [customerQuery, setCustomerQuery] = useState('');
  const [options, setOptions] = useState<CustomerOption[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerOption | null>(null);
  const [customerForm, setCustomerForm] = useState<CustomerForm>(emptyCustomerForm);
  const [copyLeadDetails, setCopyLeadDetails] = useState(true);
  const [saving, setSaving] = useState(false);
  const prefilledCustomer = useRef(false);

  useEffect(() => {
    if (!open || createNew) return;
    dataProvider
      .getList<CustomerOption>('customers', {
        pagination: { page: 1, perPage: 25 },
        sort: { field: 'createdAt', order: 'DESC' },
        filter: { q: customerQuery }
      })
      .then(({ data }) => setOptions(data))
      .catch(() => setOptions([]));
  }, [createNew, customerQuery, dataProvider, open]);

  useEffect(() => {
    if (!open || !createNew || !lead || prefilledCustomer.current) return;
    setCustomerForm({
      firstName: lead.firstName ?? '',
      lastName: lead.lastName ?? '',
      primaryEmail: lead.email ?? '',
      primaryPhone: lead.phone ?? '',
      primaryStreet: lead.propertyStreet ?? '',
      primaryCity: lead.propertyCity ?? '',
      primaryState: lead.propertyState ?? '',
      primaryZip: lead.propertyZip ?? ''
    });
    prefilledCustomer.current = true;
  }, [createNew, lead, open]);

  const handleClose = () => {
    setOpen(false);
    setCreateNew(false);
    setCustomerQuery('');
    setSelectedCustomer(null);
    setCustomerForm(emptyCustomerForm);
    setCopyLeadDetails(true);
    prefilledCustomer.current = false;
  };

  const handleConvert = async () => {
    if (!lead?.id) return;
    if (!createNew && !selectedCustomer) {
      notify('Select a customer or create a new one', { type: 'warning' });
      return;
    }
    if (createNew && (!customerForm.firstName.trim() || !customerForm.lastName.trim())) {
      notify('Customer first and last name are required', { type: 'warning' });
      return;
    }

    const payload = {
      ...(createNew ? { customer: { ...customerForm } } : { customerId: selectedCustomer?.id }),
      copyLeadDetails
    };

    setSaving(true);
    try {
      const { json } = await authFetchJson(
        `${API_BASE_URL}/leads/${lead.id}/convert-to-project`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' }
        }
      );
      notify('Project created', { type: 'success' });
      handleClose();
      if (json?.id) {
        navigate(`/projects/${json.id}/edit`);
      }
    } catch (error) {
      console.error('Failed to convert lead', error);
      notify('Failed to convert lead', { type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (!lead) return null;

  return (
    <>
      <Button variant="contained" size="small" onClick={() => setOpen(true)}>
        Convert to Project
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Convert Lead to Project</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={createNew}
                  onChange={(event) => {
                    const next = event.target.checked;
                    setCreateNew(next);
                    if (!next) {
                      prefilledCustomer.current = false;
                    }
                  }}
                />
              }
              label="Create new customer"
            />
          </Box>
          <Box sx={{ mt: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={copyLeadDetails}
                  onChange={(event) => setCopyLeadDetails(event.target.checked)}
                />
              }
              label="Copy lead details into project"
            />
          </Box>

          {!createNew && (
            <Autocomplete
              options={options}
              value={selectedCustomer}
              onChange={(_, value) => setSelectedCustomer(value)}
              inputValue={customerQuery}
              onInputChange={(_, value) => setCustomerQuery(value)}
              getOptionLabel={(option) =>
                `${option.firstName ?? ''} ${option.lastName ?? ''}`.trim()
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Customer" placeholder="Search customers" />
              )}
              sx={{ mt: 2 }}
            />
          )}

          {createNew && (
            <Box sx={{ mt: 2, display: 'grid', gap: 2 }}>
              <TextField
                label="First Name"
                value={customerForm.firstName}
                onChange={(event) =>
                  setCustomerForm((prev) => ({ ...prev, firstName: event.target.value }))
                }
              />
              <TextField
                label="Last Name"
                value={customerForm.lastName}
                onChange={(event) =>
                  setCustomerForm((prev) => ({ ...prev, lastName: event.target.value }))
                }
              />
              <TextField
                label="Primary Email"
                value={customerForm.primaryEmail}
                onChange={(event) =>
                  setCustomerForm((prev) => ({ ...prev, primaryEmail: event.target.value }))
                }
              />
              <TextField
                label="Primary Phone"
                value={customerForm.primaryPhone}
                onChange={(event) =>
                  setCustomerForm((prev) => ({ ...prev, primaryPhone: event.target.value }))
                }
              />
              <TextField
                label="Street"
                value={customerForm.primaryStreet}
                onChange={(event) =>
                  setCustomerForm((prev) => ({ ...prev, primaryStreet: event.target.value }))
                }
              />
              <TextField
                label="City"
                value={customerForm.primaryCity}
                onChange={(event) =>
                  setCustomerForm((prev) => ({ ...prev, primaryCity: event.target.value }))
                }
              />
              <TextField
                label="State"
                value={customerForm.primaryState}
                onChange={(event) =>
                  setCustomerForm((prev) => ({ ...prev, primaryState: event.target.value }))
                }
              />
              <TextField
                label="ZIP"
                value={customerForm.primaryZip}
                onChange={(event) =>
                  setCustomerForm((prev) => ({ ...prev, primaryZip: event.target.value }))
                }
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleConvert} disabled={saving}>
            Convert
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeadConvertToProjectDialog;
