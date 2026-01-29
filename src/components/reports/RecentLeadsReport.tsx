import { Box, Chip, CircularProgress, IconButton, Link as MuiLink } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import type { LeadRow } from '../../types/LeadRow.ts';
import { formatDate } from '../../utils/helperUtils.ts';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { getLossTypeColor } from '../../types/LossTypeColors.ts';

interface Props {
  days?: number;
  limit?: number;
}

const RecentLeadsReport = memo<Props>(({ days = 7, limit = 10 }) => {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authFetchJson(`${API_BASE_URL}/dashboard/recent-leads?days=${days}`)
      .then(({ json }) => {
        const allRows = Array.isArray(json) ? json : [];
        const trimmed = allRows.slice(0, limit);
        setRows(trimmed);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load recent leads', error);
        setLoading(false);
      });
  }, [days]);

  const handleClone = useCallback(
    (id: number) => {
      authFetchJson(`${API_BASE_URL}/leads/${id}/clone`, { method: 'POST' })
        .then(({ json }) => {
          if (json?.id) {
            navigate(`/leads/${json.id}/edit`);
          }
        })
        .catch((error) => {
          console.error('Failed to clone lead', error);
        });
    },
    [navigate]
  );

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: 'actions',
        headerName: '',
        width: 110,
        sortable: false,
        renderCell: (params) => (
          <Box display="flex" alignItems="center" gap={0.5}>
            <IconButton
              size="small"
              component={RouterLink}
              to={`/leads/${params.row.id}/show`}
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
            <IconButton
              size="small"
              aria-label="Clone lead"
              color="primary"
              onClick={() => handleClone(params.row.id)}
            >
              <ContentCopyOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        )
      },
      {
        field: 'leadName',
        headerName: 'Lead',
        width: 180,
        valueGetter: (_, row) => `${row.firstName ?? ''} ${row.lastName ?? ''}`.trim(),
        renderCell: (params) => (
          <MuiLink component={RouterLink} to={`/leads/${params.row.id}`} underline="hover">
            {params.value}
          </MuiLink>
        )
      },
      { field: 'leadSource', headerName: 'Source', width: 130 },
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
      { field: 'status', headerName: 'Status', width: 110 },
      { field: 'notesCount', headerName: 'Notes', width: 90 },
      { field: 'documentsCount', headerName: 'Docs', width: 90 },
      {
        field: 'receivedAt',
        headerName: 'Received',
        width: 130,
        valueGetter: (_, row) => formatDate(row.receivedAt || row.createdAt)
      },
      
    ],
    [handleClone]
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
            sortModel: [{ field: 'receivedAt', sort: 'desc' }]
          }
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
});

export default RecentLeadsReport;
