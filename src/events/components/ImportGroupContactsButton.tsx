import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useNotify, useRecordContext, useRefresh } from 'react-admin';
import { API_BASE_URL, authFetchJson } from '../../apiClient'; // your existing pattern

export const ImportGroupContactsButton: React.FC = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const event = useRecordContext();
  const [loading, setLoading] = useState(false);

  if (!event?.id || !event?.groupId) return null;

  const handleImport = async () => {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/group-event-invites/import-from-group`;

      const response = await authFetchJson(url, {
        method: 'POST',
        body: JSON.stringify({
          eventId: event.id,
          groupId: event.groupId
        }),
        headers: new Headers({ 'Content-Type': 'application/json' })
      });

      notify(`${response.json.imported} contacts imported`, { type: 'success' });
      refresh();
    } catch (e) {
      notify('Import failed', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outlined" onClick={handleImport} disabled={loading} size="small">
      {loading ? <CircularProgress size={16} /> : 'Import Group Contacts'}
    </Button>
  );
};
