import { Paper, Button } from '@mui/material';
import { SaveButton, useNotify, useSaveContext } from 'react-admin';
import { useFormContext } from 'react-hook-form';

export const FloatingToolbar = () => {
  const { save } = useSaveContext();
  const notify = useNotify();
  const { getValues, formState, trigger } = useFormContext();
  const { isDirty = false } = formState; // default to false early

  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) {
      //notify('Please correct validation errors before saving.', { type: 'warning' });
      return;
    }

    const values = getValues();
    save?.(values, {
      onSuccess: () => notify('Saved', { type: 'success' }),
      onError: (error) =>
        notify(`Error: ${error?.toString?.() || 'Unknown error'}`, { type: 'error' })
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        top: 100,
        right: 24,
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        gap: 1,
        p: 2,
        zIndex: 1300
      }}
    >
      <SaveButton label="Save & Close" fullWidth />
      <Button
        variant="contained"
        color="primary"
        size="medium"
        fullWidth
        onClick={handleSave}
        disabled={!isDirty} // start disabled, enable only when dirty
      >
        Save
      </Button>
    </Paper>
  );
};
