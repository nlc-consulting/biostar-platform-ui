import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Link as MuiLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';
import { useRecordContext } from 'react-admin';
import { formatDate } from '../../utils/helperUtils.ts';

type AuditLog = {
  id: number;
  action: string;
  message?: string | null;
  createdAt: string;
  actorUser?: { fullName?: string | null } | null;
  metadata?: Record<string, unknown> | null;
};

type Props = {
  entityType: 'LEAD' | 'PROJECT' | 'CUSTOMER' | 'DOCUMENT' | 'NOTE';
  entityIdField?: string;
};

const AuditLogSection: React.FC<Props> = ({ entityType, entityIdField = 'id' }) => {
  const record = useRecordContext();
  const entityId = record ? record[entityIdField] : undefined;
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!entityId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    authFetchJson(`${API_BASE_URL}/audit-logs?entityType=${entityType}&entityId=${entityId}`)
      .then(({ json }) => {
        setLogs(Array.isArray(json) ? json : []);
      })
      .catch((error) => {
        console.error('Failed to load audit logs', error);
        setLogs([]);
      })
      .finally(() => setLoading(false));
  }, [entityId, entityType]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!logs.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        No activity yet.
      </Typography>
    );
  }

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Lead</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => {
            const leadId =
              typeof log.metadata?.leadId === 'number'
                ? (log.metadata.leadId as number)
                : null;

            return (
              <TableRow key={log.id}>
                <TableCell>{formatDate(log.createdAt)}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.message ?? '-'}</TableCell>
                <TableCell>{log.actorUser?.fullName ?? '-'}</TableCell>
                <TableCell>
                  {leadId ? (
                    <MuiLink component={RouterLink} to={`/leads/${leadId}/show`} underline="hover">
                      View Lead
                    </MuiLink>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AuditLogSection;
