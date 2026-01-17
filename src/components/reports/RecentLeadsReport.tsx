import { Box, CircularProgress, Link as MuiLink } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { memo, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';
import { Link as RouterLink } from 'react-router-dom';
import type { LeadRow } from '../../types/LeadRow.ts';
import { formatDate } from '../../utils/helperUtils.ts';

interface Props {
  days?: number;
}

const RecentLeadsReport = memo<Props>(({ days = 7 }) => {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetchJson(`${API_BASE_URL}/dashboard/recent-leads?days=${days}`)
      .then(({ json }) => {
        setRows(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load recent leads', error);
        setLoading(false);
      });
  }, [days]);

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'leadName',
        headerName: 'Lead',
        width: 200,
        valueGetter: (_, row) => `${row.firstName ?? ''} ${row.lastName ?? ''}`.trim(),
        renderCell: (params) => (
          <MuiLink component={RouterLink} to={`/leads/${params.row.id}`} underline="hover">
            {params.value}
          </MuiLink>
        )
      },
      { field: 'phone', headerName: 'Phone', width: 150 },
      { field: 'email', headerName: 'Email', width: 220 },
      { field: 'leadSource', headerName: 'Source', width: 140 },
      { field: 'lossType', headerName: 'Loss Type', width: 140 },
      { field: 'status', headerName: 'Status', width: 120 },
      {
        field: 'receivedAt',
        headerName: 'Received',
        width: 140,
        valueGetter: (_, row) => formatDate(row.receivedAt || row.createdAt)
      }
    ],
    []
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ height: 420, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
          sorting: {
            sortModel: [{ field: 'receivedAt', sort: 'desc' }]
          }
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
});

export default RecentLeadsReport;
