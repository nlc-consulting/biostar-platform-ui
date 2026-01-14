import * as React from 'react';
import { useCreate, useNotify, useRefresh, useRecordContext, TextInput } from 'react-admin';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { getErrorMessage } from '../../utils/helperUtils.ts';

export const AddProgramServiceButton = () => {
  const [open, setOpen] = React.useState(false);
  const methods = useForm({ defaultValues: { name: '' } });
  const { handleSubmit, control, reset } = methods;

  const notify = useNotify();
  const refresh = useRefresh();
  const program = useRecordContext();
  const [create, { isLoading }] = useCreate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    create(
      'program-services',
      {
        data: {
          name: data.name,
          programId: program?.id
        }
      },
      {
        onSuccess: () => {
          notify('Product added', { type: 'info' });
          reset();
          setOpen(false);
          refresh();
        },
        onError: (error) => {
          notify(`Error: ${getErrorMessage(error)}`, { type: 'warning' });
        }
      }
    );
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} size="small" variant="outlined">
        Add Product
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add New Product</DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextInput {...field} source="name" fullWidth label="Product Name" />
                    )}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
};
