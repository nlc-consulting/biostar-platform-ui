import React from 'react';
import { ActivityModal } from './ActivityModal.tsx';
import { Button } from 'react-admin';

type AddActivityButtonProps = {
  keyName: string;
  resource: string;
};

export const AddActivityButton = ({ keyName, resource }: AddActivityButtonProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outlined" size="small">
        Add Activity
      </Button>
      <ActivityModal keyName={keyName} resource={resource} open={open} setOpen={setOpen} />
    </>
  );
};
