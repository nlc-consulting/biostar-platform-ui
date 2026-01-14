import * as React from 'react';
import {
  useCreate,
  useNotify,
  useRecordContext,
  useRefresh,
  ReferenceInput,
  AutocompleteInput
} from 'react-admin';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { getErrorMessage } from '../../utils/helperUtils.ts';

const AddContactToGroup = () => {
  const group = useRecordContext(); // current group context
  const [open, setOpen] = React.useState(false);
  const methods = useForm({ defaultValues: { contactId: '' } });
  const { handleSubmit, watch, reset } = methods;

  const contactId = watch('contactId');
  const notify = useNotify();
  const refresh = useRefresh();
  const [create, { isLoading }] = useCreate();

  const onSubmit = () => {
    if (!contactId || !group?.id) {
      notify('Please select a contact', { type: 'warning' });
      return;
    }

    create(
      'group-contacts',
      { data: { groupId: group.id, contactId: Number(contactId) } },
      {
        onSuccess: () => {
          notify('Contact added to group', { type: 'info' });
          reset();
          setOpen(false);
          refresh();
        },
        onError: (error) => {
          notify(`Error: ${getErrorMessage(error)}`, { type: 'error' });
        }
      }
    );
  };

  return (
    <Box mt={2}>
      <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
        Add Contact
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Contact to Group</DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <ReferenceInput
                source="contactId"
                reference="contacts"
                label="Select Contact"
                fullWidth
              >
                <AutocompleteInput
                  fullWidth
                  optionText={(record) => `${record.firstName} ${record.lastName}`}
                />
              </ReferenceInput>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={!contactId || isLoading}>
                Save
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </Box>
  );
};

export default AddContactToGroup;
