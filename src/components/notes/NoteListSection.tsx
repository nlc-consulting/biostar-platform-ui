import {
  useListController,
  ListContextProvider,
  ResourceContextProvider,
  useCreate,
  useNotify,
  useRefresh,
  useRecordContext
} from 'react-admin';
import {
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Divider
} from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_BASE_URL, authFetch } from '../../apiClient.ts';

export type NoteEntityType = 'CONTACT' | 'GROUP' | 'OPPORTUNITY' | 'COMPANY' | 'LEAD' | 'CUSTOMER' | 'PROJECT';

export type INote = {
  id: number;
  body: string;
  entityType: NoteEntityType;
  entityId: number;
  tenantId: number;
  createdByUserId?: number | null;
  createdAt: string;
  updatedAt: string;
};

type NoteListSectionProps = {
  entityType: NoteEntityType;
  entityIdField?: string | undefined;
  hideTitle?: boolean;
};

export const NoteListSection = ({
  entityType,
  entityIdField = 'id',
  hideTitle = false,
}: NoteListSectionProps) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [body, setBody] = useState('');
  const [create, { isLoading: isCreating }] = useCreate();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const record = useRecordContext();
  const entityId = record ? record[entityIdField] : undefined;

  const listContext = useListController({
    resource: 'notes',
    filter: { entityType, entityId },
    sort: { field: 'createdAt', order: 'DESC' },
    perPage: 10,
    disableSyncWithLocation: true
  });

  const handleCreate = () => {
    if (!body.trim()) return;

    create(
      'notes',
      {
        data: { entityType, entityId, body }
      },
      {
        onSuccess: () => {
          notify('Note added');
          setBody('');
          refresh();
        },
        onError: () => notify('Failed to add note', { type: 'error' })
      }
    );
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    authFetch(`${API_BASE_URL}/notes/${id}`, { method: 'DELETE' })
      .then(() => {
        notify('Note deleted');
        refresh();
      })
      .catch(() => notify('Failed to delete note', { type: 'error' }))
      .finally(() => setDeletingId(null));
  };

  return (
    <ResourceContextProvider value="notes">
      <ListContextProvider value={listContext}>
        <Box>
          {!hideTitle && (
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Notes
            </Typography>
          )}

          <Box
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              bgcolor: '#fafafa',
              p: 2
            }}
          >
            <TextField
              label="Add Note"
              multiline
              fullWidth
              minRows={2}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={isCreating}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ bgcolor: 'white' }}
            />

            <Box mt={1} display="flex" justifyContent="flex-end">
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleCreate}
                disabled={isCreating || !body.trim()}
              >
                Add Note
              </Button>
            </Box>

            <Divider sx={{ my: 2 }} />

            {listContext.isLoading ? (
              <CircularProgress size={24} />
            ) : listContext?.data?.length === 0 ? (
              <Typography>No notes yet.</Typography>
            ) : (
              listContext?.data?.map((note: INote) => (
                <Box
                  key={note.id}
                  mb={2}
                  p={2}
                  sx={{
                    borderRadius: 1,
                    bgcolor: '#fff',
                    border: '1px solid #eee'
                  }}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{note.body}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(note.id)}
                      disabled={deletingId === note.id}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(note.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </ListContextProvider>
    </ResourceContextProvider>
  );
}
