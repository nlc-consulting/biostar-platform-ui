import { Button } from 'react-admin';
import { ActivityModal } from './ActivityModal.tsx';
import { useState } from 'react';
import { API_BASE_URL, authFetch } from '../apiClient.ts';

type EditActivityButtonWithFetchProps = {
  keyName: string;
  resource: string;
  recordId: number;
  onSaved?: () => void;
};

export const EditActivityButtonWithFetch = ({
  keyName,
  resource,
  recordId,
  onSaved
}: EditActivityButtonWithFetchProps) => {
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
      <ActivityModal
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
