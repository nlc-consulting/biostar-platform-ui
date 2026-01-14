import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Box,
  Menu,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';
import AddContactToGroupModal from './AddContactToGroupModal.tsx';
import {
  ListContextProvider,
  ResourceContextProvider,
  type Identifier,
  useDataProvider,
  useListController,
  useNotify,
  useRecordContext
} from 'react-admin';
import { PaginatedGroupContacts } from './PaginatedGroupContacts.tsx';
import { EmailAllButton } from './EmailAllButton.tsx';
import DownloadCsvButton from './DownloadCsvButton.tsx';
import { getErrorMessage } from '../../utils/helperUtils.ts';
import { API_BASE_URL, authFetch } from '../../apiClient.ts';

interface GroupContactRecord {
  id: Identifier;
  primaryEmail?: string | null;
}

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

const GroupContacts: React.FC = () => {
  const group = useRecordContext();
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(null);
  const [selectingAll, setSelectingAll] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareToInput, setShareToInput] = useState('');
  const [shareToError, setShareToError] = useState('');
  const [shareSubject, setShareSubject] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [sharing, setSharing] = useState(false);
  const [selectedRecordMap, setSelectedRecordMap] = useState<Map<Identifier, GroupContactRecord>>(
    new Map()
  );
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const resource = 'group-contacts';

  const controllerProps = useListController({
    resource,
    filter: { groupId: group?.id },
    sort: { field: 'displayName', order: 'ASC' },
    perPage: 10,
    disableSyncWithLocation: true // <— prevents URL-based reloads
  });

  const selectedCount = controllerProps.selectedIds?.length ?? 0;
  const totalCount = controllerProps.total ?? 0;
  const actionsOpen = Boolean(actionsAnchorEl);

  useEffect(() => {
    const pageRecords = (controllerProps.data ?? []) as GroupContactRecord[];
    if (pageRecords.length === 0) return;
    setSelectedRecordMap((prev) => {
      const next = new Map(prev);
      pageRecords.forEach((record) => {
        if (record?.id !== undefined && record?.id !== null) {
          next.set(record.id, record);
        }
      });
      return next;
    });
  }, [controllerProps.data]);

  if (!group?.id) return null;

  const defaultShareSubject = useMemo(
    () => `Shared contacts from ${group.name ?? 'group'}`,
    [group.name]
  );

  useEffect(() => {
    if (shareDialogOpen) {
      setShareSubject(defaultShareSubject);
      setShareMessage(
        `Hi there,\n\nSharing a few contacts from ${group.name ?? 'this group'} for your review.\n\nThanks!`
      );
    }
  }, [defaultShareSubject, shareDialogOpen]);

  const handleSelectAllGroup = async () => {
    if (!group?.id) return;
    setSelectingAll(true);
    try {
      const response = await dataProvider.getList<GroupContactRecord>('group-contacts', {
        filter: { groupId: group.id },
        pagination: { page: 1, perPage: 10000 },
        sort: { field: 'displayName', order: 'ASC' }
      });
      const ids = response.data.map((record) => record.id);
      controllerProps.onSelect(ids);
      setSelectedRecordMap((prev) => {
        const next = new Map(prev);
        response.data.forEach((record) => {
          next.set(record.id, record);
        });
        return next;
      });
    } catch (error) {
      notify(`Error: ${getErrorMessage(error)}`, { type: 'error' });
    } finally {
      setSelectingAll(false);
    }
  };

  const handleShareSubmit = () => {
    const { emails, invalid } = parseEmails(shareToInput);
    if (invalid.length > 0) {
      setShareToError(`Invalid email(s): ${invalid.join(', ')}`);
      return;
    }
    if (emails.length === 0) {
      setShareToError('Enter at least one email address.');
      return;
    }
    setShareToError('');
    if (controllerProps.selectedIds.length === 0) {
      notify('Select at least one contact to share.', { type: 'warning' });
      return;
    }
    setSharing(true);
    authFetch(`${API_BASE_URL}/group-contacts/share-csv`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emails: emails.join(','),
        title: shareSubject,
        body: shareMessage,
        ids: controllerProps.selectedIds
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Share failed with status ${response.status}`);
        }
        notify('Contacts shared', { type: 'info' });
        setShareDialogOpen(false);
        setShareToInput('');
        setShareMessage('');
      })
      .catch((error) => {
        notify(`Error: ${getErrorMessage(error)}`, { type: 'error' });
      })
      .finally(() => setSharing(false));
  };

  const handleEmailSelected = () => {
    const selectedEmails = controllerProps.selectedIds
      .map((id) => selectedRecordMap.get(id)?.primaryEmail?.trim())
      .filter((email): email is string => Boolean(email));
    if (selectedEmails.length === 0) {
      notify('No email addresses found for selected contacts.', { type: 'warning' });
      return;
    }
    const outlookMailto = `mailto:${selectedEmails.join(';')}`;
    window.location.href = outlookMailto;
  };

  const handleDownloadSelected = async () => {
    if (controllerProps.selectedIds.length === 0) return;
    const url = `${API_BASE_URL}/group-contacts/export-csv?filter=${encodeURIComponent(
      JSON.stringify({ groupId: group.id, ids: controllerProps.selectedIds })
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
      const groupName = group.name ?? `group-${group.id}`;
      const safeGroupName = groupName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      link.download = `${safeGroupName}-selected-contacts.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch (error) {
      notify(`Error: ${getErrorMessage(error)}`, { type: 'error' });
    }
  };

  return (
    <ResourceContextProvider value={resource}>
      <ListContextProvider value={controllerProps}>
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle1">Contacts</Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                {(totalCount === 0 || selectedCount < totalCount) && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleSelectAllGroup}
                    disabled={selectingAll}
                  >
                    {selectingAll ? 'Selecting...' : 'Select All in Group'}
                  </Button>
                )}
                {selectedCount > 0 && (
                  <>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={(event) => setActionsAnchorEl(event.currentTarget)}
                    >
                      Bulk Actions
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                      Selected: {selectedCount}
                    </Typography>
                    <Button
                      size="small"
                      variant="text"
                      onClick={() => controllerProps.onUnselectItems()}
                    >
                      Clear
                    </Button>
                    <Menu
                      anchorEl={actionsAnchorEl}
                      open={actionsOpen}
                      onClose={() => setActionsAnchorEl(null)}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                      <MenuItem disabled>Bulk Actions</MenuItem>
                      <MenuItem
                        onClick={() => {
                          setActionsAnchorEl(null);
                          setShareDialogOpen(true);
                        }}
                      >
                        Share Selected
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setActionsAnchorEl(null);
                          handleEmailSelected();
                        }}
                      >
                        Email Selected (Outlook)
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setActionsAnchorEl(null);
                          handleDownloadSelected();
                        }}
                      >
                        Download Selected
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Stack>
            </Box>
            <PaginatedGroupContacts />
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
              <AddContactToGroupModal />
              <Box display="flex" justifyContent="space-between">
                <EmailAllButton groupId={group.id as number} />
                <DownloadCsvButton groupId={group.id as number} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={shareDialogOpen}
          onClose={() => {
            if (!sharing) {
              setShareDialogOpen(false);
            }
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Share Selected Contacts</DialogTitle>
          <DialogContent>
            <TextField
              label="To"
              placeholder="name@company.com, other@company.com"
              value={shareToInput}
              onChange={(event) => {
                setShareToInput(event.target.value);
                setShareToError('');
              }}
              error={shareToError.length > 0}
              helperText={
                shareToError.length > 0
                  ? shareToError
                  : 'Separate multiple email addresses with commas.'
              }
              fullWidth
              margin="normal"
              multiline
              minRows={2}
            />
            <TextField
              label="Subject"
              value={shareSubject}
              onChange={(event) => setShareSubject(event.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Custom Message"
              value={shareMessage}
              onChange={(event) => setShareMessage(event.target.value)}
              fullWidth
              margin="normal"
              multiline
              minRows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShareDialogOpen(false)} disabled={sharing}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleShareSubmit} disabled={sharing}>
              {sharing ? 'Sharing...' : 'Share'}
            </Button>
          </DialogActions>
        </Dialog>
      </ListContextProvider>
    </ResourceContextProvider>
  );
};

export default GroupContacts;
