import { Box, CircularProgress, IconButton, Link as MuiLink } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { memo, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';
import { Link as RouterLink } from 'react-router-dom';
import type { LeadRow } from '../../types/LeadRow.ts';
import { formatDate } from '../../utils/helperUtils.ts';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

interface Props {
  days?: number;
  limit?: number;
}

const RecentLeadsReport = memo<Props>(({ days = 7, limit = 10 }) => {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    authFetchJson(`${API_BASE_URL}/dashboard/recent-leads?days=${days}`)
      .then(({ json }) => {
        const allRows = Array.isArray(json) ? json : [];
        setTotalCount(allRows.length);
        const trimmed = allRows.slice(0, limit);
        setRows(trimmed);
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
        width: 220,
        valueGetter: (_, row) => `${row.firstName ?? ''} ${row.lastName ?? ''}`.trim(),
        renderCell: (params) => (
          <MuiLink component={RouterLink} to={`/leads/${params.row.id}`} underline="hover">
            {params.value}
          </MuiLink>
        )
      },
      { field: 'leadSource', headerName: 'Source', width: 130 },
      { field: 'lossType', headerName: 'Loss Type', width: 130 },
      { field: 'status', headerName: 'Status', width: 110 },
      {
        field: 'receivedAt',
        headerName: 'Received',
        width: 130,
        valueGetter: (_, row) => formatDate(row.receivedAt || row.createdAt)
      },
      {
        field: 'actions',
        headerName: '',
        width: 90,
        sortable: false,
        renderCell: (params) => (
          <Box display="flex" alignItems="center" gap={0.5}>
            <IconButton
              size="small"
              component={RouterLink}
              to={`/leads/${params.row.id}`}
              aria-label="View lead"
              color="primary"
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component={RouterLink}
              to={`/leads/${params.row.id}/edit`}
              aria-label="Edit lead"
              color="primary"
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        )
      }
    ],
    []
  );

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ height: 320, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        density="compact"
        initialState={{
          sorting: {
            sortModel: [{ field: 'receivedAt', sort: 'desc' }]
          }
        }}
        disableRowSelectionOnClick
      />
      {totalCount > rows.length && (
        <Box sx={{ mt: 1, color: 'text.secondary', fontSize: 12 }}>
          Showing {rows.length} of {totalCount} leads
        </Box>
      )}
    </Box>
  );
});

export default RecentLeadsReport;
