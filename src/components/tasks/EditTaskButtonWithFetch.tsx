import { Button } from 'react-admin';
import { useState } from 'react';
import { API_BASE_URL, authFetch } from '../../apiClient.ts';
import { TaskModal } from './TaskModal.tsx';

type EditTaskButtonWithFetchProps = {
  keyName: string; // i.e taskId (primary key name)
  resource: string; // i.e 'tasks'
  recordId: number;
  onSaved?: () => void;
};

export const EditTaskButtonWithFetch = ({
  keyName,
  resource,
  recordId,
  onSaved
}: EditTaskButtonWithFetchProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [record, setRecord] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/${resource}/${recordId}`);
      const data = await res.json();
      setRecord(data);
      setOpen(true);
    } catch (err) {
      console.error('Failed to fetch record for editing activity:', err);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} size="small" variant="outlined">
        Edit
      </Button>
      <TaskModal
        open={open}
        setOpen={setOpen}
        initialRecord={record}
        keyName={keyName}
        resource={resource}
        onSaved={onSaved}
      />
    </>
  );
};
