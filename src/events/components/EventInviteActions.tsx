import { useState } from 'react';
import { useRecordContext, DeleteButton } from 'react-admin';
import EditEventInviteModal from './EditEventInviteModal.tsx';
import { Stack } from '@mui/material';

export const EventInviteActions = () => {
  const record = useRecordContext();
  const [open, setOpen] = useState(false);

  if (!record) return null;

  return (
    <Stack direction="row" spacing={1}>
      <EditEventInviteModal open={open} setOpen={setOpen} />
      <DeleteButton
        label=""
        redirect={false}
        confirmTitle="Remove Invite?"
        confirmContent="This will remove the invited contact from the event."
        mutationMode="pessimistic"
      />
    </Stack>
  );
};
