import { Box, Button, CircularProgress, Link as MuiLink } from '@mui/material';
import { useEffect, useState } from 'react';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';
import { Link } from 'react-router-dom';
import type { PipelineRow } from '../../types/PipelineRow.ts';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface Props {
  isDashboard?: boolean;
}

export const WonReport: React.FunctionComponent<Props> = (props) => {
  const { isDashboard = false } = props;
  const [rows, setRows] = useState<PipelineRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDashboard) {
      authFetchJson(`${API_BASE_URL}/dashboard/won-opportunities`)
        .then(({ json }) => {
          setRows(json);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading dashboard data:', error);
          setLoading(false);
        });
    } else {
      authFetchJson(`${API_BASE_URL}/reports/won`)
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
    const headers = ['Opened', 'Status', 'Contact', 'Opportunity'];
    const csvRows = rows.map((row) => [
      new Date(row.dateOpened).toLocaleDateString(),
      row.status,
      row.contactName,
      row.opportunityName
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map((r) => r.map((cell) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `pipeline-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const columns: GridColDef[] = [
    {
      field: 'dateClosed',
      headerName: 'Closed',
      width: 175,
      renderCell: (params) => {
        const raw = params.row?.dateClosed;
        if (!raw) return '';
        const date = new Date(raw);
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
      },
      sortComparator: (v1, v2) => {
        const d1 = new Date(v1);
        const d2 = new Date(v2);
        return d1.getTime() - d2.getTime();
      }
    },
    {
      field: 'dateOpened',
      headerName: 'Opened',
      width: 175,
      renderCell: (params) => {
        const raw = params.row?.dateOpened;
        if (!raw) return '';
        const date = new Date(raw);
        return isNaN(date.getTime()) ? '' : date.toLocaleDateString();
      },
      sortComparator: (v1, v2) => {
        const d1 = new Date(v1);
        const d2 = new Date(v2);
        return d1.getTime() - d2.getTime();
      }
    },
    { field: 'status', headerName: 'Status', width: 175 },
    {
      field: 'contactName',
      headerName: 'Contact',
      width: 250,
      renderCell: (params) => (
        <MuiLink component={Link} target={'_blank'} to={`/contacts/${params.row.contactId}`}>
          {params.value}
        </MuiLink>
      )
    },
    {
      field: 'opportunityName',
      headerName: 'Opportunity',
      flex: 1,
      renderCell: (params) => (
        <MuiLink component={Link} target={'_blank'} to={`/opportunities/${params.row.id}`}>
          {params.value}
        </MuiLink>
      )
    }
  ];

  return (
    <>
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
                    sortModel: [{ field: 'dateOpened', sort: 'desc' }]
                  }
                }}
                disableRowSelectionOnClick
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
