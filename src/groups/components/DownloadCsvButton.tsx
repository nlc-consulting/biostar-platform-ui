import React from 'react';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { API_BASE_URL, authFetch } from '../../apiClient.ts';

interface DownloadCsvButtonProps {
  groupId: number;
}

const DownloadCsvButton: React.FC<DownloadCsvButtonProps> = ({ groupId }) => {
  const handleDownload = async () => {
    const url = `${API_BASE_URL}/group-contacts/export-csv?filter=${encodeURIComponent(
      JSON.stringify({ groupId })
    )}`;
    try {
      const response = await authFetch(url, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `group-${groupId}-contacts.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error('Failed to download CSV', error);
    }
  };

  return (
    <Button
      sx={{ ml: 1 }}
      variant="outlined"
      startIcon={<DownloadIcon />}
      onClick={handleDownload}
    >
      Download All
    </Button>
  );
};

export default DownloadCsvButton;
