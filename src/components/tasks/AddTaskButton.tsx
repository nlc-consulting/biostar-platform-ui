import React from 'react';
import { Button } from 'react-admin';
import { TaskModal } from './TaskModal.tsx';

type AddTaskButtonProps = {
  keyName: string; // i.e taskId (primary key name)
  resource: string; // i.e 'tasks'
  onSaved?: () => void;
};

export const AddTaskButton = ({ keyName, resource, onSaved }: AddTaskButtonProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        size="small"
        sx={{ marginBottom: 2 }}
      >
        Add Task
      </Button>
      <TaskModal
        keyName={keyName}
        resource={resource}
        open={open}
        setOpen={setOpen}
        onSaved={onSaved}
      />
    </>
  );
};
