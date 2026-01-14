import { Box, Button, CircularProgress, Link as MuiLink } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';

interface IntroductionRow {
  id: number;
  dateIntroduced: string;
  fromContactId: number; // introducer (e.g. Michael)
  fromContactName: string;
  toContactId: number; // person introduced to CRM user (e.g. David)
  toContactName: string;
}

interface Props {
  isDashboard?: boolean;
}

export const IntroductionsReport: React.FC<Props> = ({ isDashboard = false }) => {
  const [rows, setRows] = useState<IntroductionRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDashboard) {
      authFetchJson(`${API_BASE_URL}/dashboard/introductions`)
        .then(({ json }) => {
          setRows(json);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading dashboard data:', error);
          setLoading(false);
        });
    } else {
      authFetchJson(`${API_BASE_URL}/reports/introductions`)
        .then(({ json }) => {
          setRows(json);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load pipeline report', err);
          setLoading(false);
        });
    }
  }, [isDashboard]);

  const exportToCSV = () => {
    const headers = ['Date', 'Introduced By', 'Introduced To'];
    const csvRows = rows.map((r) => [
      new Date(r.dateIntroduced).toLocaleDateString(),
      r.fromContactName,
      r.toContactName
    ]);

    const content = [headers, ...csvRows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `introductions-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const columns: GridColDef[] = [
    {
      field: 'toContactName',
      headerName: 'Introduced To',
      width: 250,
      renderCell: (params) => (
        <MuiLink
          component={Link}
          to={`/contacts/${params.row.toContactId}`}
          target="_blank"
          underline="hover"
        >
          {params.value}
        </MuiLink>
      )
    },
    {
      field: 'fromContactName',
      headerName: 'Introduced By',
      width: 250,
      renderCell: (params) => (
        <MuiLink
          component={Link}
          to={`/contacts/${params.row.fromContactId}`}
          target="_blank"
          underline="hover"
        >
          {params.value}
        </MuiLink>
      )
    },
    {
      field: 'dateIntroduced',
      headerName: 'Introduced On',
      width: 250,
      renderCell: (params) => {
        const date = new Date(params.value);
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
      }
    }
  ];

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {!isDashboard && (
            <Box mb={2}>
              <Button variant="outlined" onClick={exportToCSV}>
                Download CSV
              </Button>
            </Box>
          )}
          <Box sx={{ height: isDashboard ? 400 : 600, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pagination
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 25, page: 0 } },
                sorting: {
                  sortModel: [{ field: 'dateIntroduced', sort: 'desc' }]
                }
              }}
              disableRowSelectionOnClick
            />
          </Box>
        </>
      )}
    </Box>
  );
};
