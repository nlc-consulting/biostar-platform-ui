import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link as MuiLink,
  Stack,
  TextField
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNotify } from 'react-admin';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';
import { Link } from 'react-router-dom';
import type { PipelineRow } from '../../types/PipelineRow.ts';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { getErrorMessage } from '../../utils/helperUtils.ts';

interface Props {
  isDashboard?: boolean;
  showEmailButton?: boolean;
}

interface PipelineGridProps {
  columns: GridColDef[];
  isDashboard: boolean;
  rows: PipelineRow[];
}

interface PipelineReportEmailButtonProps {
  days?: string;
  size?: 'small' | 'medium' | 'large';
}

const PipelineGrid = memo<PipelineGridProps>(({ columns, isDashboard, rows }) => (
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
));

const parseEmails = (
  rawInput: string
): {
  emails: string[];
  invalid: string[];
} => {
  const entries = rawInput
    .split(',')
    .map((email) => email.trim())
    .filter((email) => email.length > 0);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const invalid = entries.filter((email) => !emailRegex.test(email));
  const emails = entries.filter((email) => emailRegex.test(email));
  return { emails, invalid };
};

export const PipelineReportEmailButton = memo<PipelineReportEmailButtonProps>(
  ({ days, size = 'medium' }) => {
    const [emailDialogOpen, setEmailDialogOpen] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');
    const [sendingEmail, setSendingEmail] = useState(false);
    const notify = useNotify();

    const handleSendEmail = async () => {
      const { emails, invalid } = parseEmails(emailInput);
      if (invalid.length > 0) {
        setEmailError(`Invalid email(s): ${invalid.join(', ')}`);
        return;
      }

      if (emails.length === 0) {
        setEmailError('Enter at least one email address.');
        return;
      }

      setSendingEmail(true);
      setEmailError('');
      try {
        const payload: { emails: string[]; days?: string } = { emails };
        if (days) {
          payload.days = days;
        }
        await authFetchJson(`${API_BASE_URL}/reports/pipeline/email`, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: new Headers({ 'Content-Type': 'application/json' })
        });
        notify('Pipeline report email sent', { type: 'info' });
        setEmailDialogOpen(false);
        setEmailInput('');
      } catch (error) {
        notify(`Error: ${getErrorMessage(error)}`, { type: 'error' });
      } finally {
        setSendingEmail(false);
      }
    };

    return (
      <>
        <Button
          variant="outlined"
          startIcon={<EmailIcon />}
          onClick={() => setEmailDialogOpen(true)}
          size={size}
        >
          Email To
        </Button>
        <Dialog
          open={emailDialogOpen}
          onClose={() => {
            if (!sendingEmail) {
              setEmailDialogOpen(false);
              setEmailError('');
            }
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Email Pipeline Report</DialogTitle>
          <DialogContent>
            <TextField
              label="Email addresses"
              placeholder="name@company.com, other@company.com"
              value={emailInput}
              onChange={(event) => {
                setEmailInput(event.target.value);
                setEmailError('');
              }}
              error={emailError.length > 0}
              helperText={
                emailError.length > 0
                  ? emailError
                  : 'Separate multiple email addresses with commas.'
              }
              fullWidth
              margin="normal"
              multiline
              minRows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                if (!sendingEmail) {
                  setEmailDialogOpen(false);
                  setEmailError('');
                }
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSendEmail} disabled={sendingEmail}>
              {sendingEmail ? 'Sending...' : 'Send Email'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export const PipelineReport: React.FunctionComponent<Props> = (props) => {
  const { isDashboard = false, showEmailButton = true } = props;
  const [rows, setRows] = useState<PipelineRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDashboard) {
      authFetchJson(`${API_BASE_URL}/dashboard/open-opportunities`)
        .then(({ json }) => {
          setRows(json);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading dashboard data:', error);
          setLoading(false);
        });
    } else {
      authFetchJson(`${API_BASE_URL}/reports/pipeline`)
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
    const headers = ['Opened', 'Status', 'Stage', 'Contact', 'Opportunity'];
    const csvRows = rows.map((row) => [
      new Date(row.dateOpened).toLocaleDateString(),
      row.status,
      row.stage,
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

  const columns = useMemo<GridColDef[]>(
    () => [
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
        field: 'stage',
        headerName: 'Stage',
        width: 250
      },
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
    ],
    []
  );

  return (
    <>
      <Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {(!isDashboard || showEmailButton) && (
              <Stack direction="row" spacing={1} mb={2} alignItems="center">
                {!isDashboard && (
                  <Button variant="outlined" onClick={exportToCSV}>
                    Download CSV
                  </Button>
                )}
                {showEmailButton && (
                  <PipelineReportEmailButton days={isDashboard ? '15' : undefined} />
                )}
              </Stack>
            )}

            <PipelineGrid rows={rows} columns={columns} isDashboard={isDashboard} />
          </>
        )}
      </Box>
    </>
  );
};
