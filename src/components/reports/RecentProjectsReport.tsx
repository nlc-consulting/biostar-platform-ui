import { Box, Chip, CircularProgress, IconButton, Link as MuiLink } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { memo, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';
import { Link as RouterLink } from 'react-router-dom';
import type { ProjectRow } from '../../types/ProjectRow.ts';
import { formatDate, formatStatus } from '../../utils/helperUtils.ts';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getLossTypeColor } from '../../types/LossTypeColors.ts';

interface Props {
  days?: number;
  limit?: number;
}

const RecentProjectsReport = memo<Props>(({ days = 7, limit = 10 }) => {
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetchJson(`${API_BASE_URL}/dashboard/recent-projects?days=${days}`)
      .then(({ json }) => {
        const allRows = Array.isArray(json) ? json : [];
        setRows(allRows.slice(0, limit));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load recent projects', error);
        setLoading(false);
      });
  }, [days, limit]);

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'actions',
        headerName: '',
        width: 80,
        sortable: false,
        renderCell: (params) => (
          <Box display="flex" alignItems="center" gap={0.5}>
            <IconButton
              size="small"
              component={RouterLink}
              to={`/projects/${params.row.id}/show`}
              aria-label="View project"
              color="primary"
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component={RouterLink}
              to={`/projects/${params.row.id}/edit`}
              aria-label="Edit project"
              color="primary"
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        )
      },
      {
        field: 'name',
        headerName: 'Project',
        width: 200,
        renderCell: (params) => (
          <MuiLink component={RouterLink} to={`/projects/${params.row.id}/show`} underline="hover">
            {params.value}
          </MuiLink>
        )
      },
      {
        field: 'customer',
        headerName: 'Customer',
        width: 180,
        valueGetter: (_, row) => `${row.customer.firstName} ${row.customer.lastName}`.trim()
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 130,
        valueGetter: (_, row) => formatStatus(row.status)
      },
      {
        field: 'isEmergency',
        headerName: 'Emergency',
        width: 110,
        valueGetter: (_, row) => (row.isEmergency ? 'Yes' : 'No')
      },
      {
        field: 'lossType',
        headerName: 'Loss Type',
        width: 150,
        renderCell: (params) => {
          const value = params.value as string | null;
          if (!value) return '-';
          return (
            <Chip
              size="small"
              label={value}
              sx={{ bgcolor: getLossTypeColor(value), color: '#fff' }}
            />
          );
        }
      },
      { field: 'notesCount', headerName: 'Notes', width: 90 },
      { field: 'documentsCount', headerName: 'Docs', width: 90 },
      { field: 'propertyCity', headerName: 'City', width: 140 },
      {
        field: 'createdAt',
        headerName: 'Created',
        width: 130,
        valueGetter: (_, row) => formatDate(row.createdAt)
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
        hideFooter
        hideFooterPagination
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }]
          }
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
});

export default RecentProjectsReport;
