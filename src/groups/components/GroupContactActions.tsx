import { DeleteButton, useRecordContext } from 'react-admin';
import { Box } from '@mui/material';
import EditGroupContactDateModal from './EditGroupContactDateModal.tsx';

export const GroupContactActions = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <EditGroupContactDateModal />
      <DeleteButton
        mutationMode="pessimistic"
        resource="group-contacts"
        redirect={false}
        label=""
        confirmTitle="Are you sure?"
        confirmContent="This will remove the contact from the group."
      />
    </Box>
  );
};
