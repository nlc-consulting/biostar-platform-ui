import React from 'react';
import { useRecordContext } from 'react-admin';
import { Button } from '@mui/material';
import { ActivityModal } from './ActivityModal.tsx';

type AddActivityButtonProps = {
  keyName: string;
  resource: string;
};

export const EditActivityButton = ({ keyName, resource }: AddActivityButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const record = useRecordContext();

  return (
    <>
      <Button onClick={() => setOpen(true)} size="small" variant="outlined">
        Edit
      </Button>
      <ActivityModal
        open={open}
        setOpen={setOpen}
        initialRecord={record}
        keyName={keyName}
        resource={resource}
      />
    </>
  );
};
