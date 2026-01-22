import {
  useNotify,
  useRecordContext,
  useRefresh
} from 'react-admin';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Link as MuiLink,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { API_BASE_URL, authFetch } from '../../apiClient.ts';

export type DocumentEntityType = 'LEAD' | 'CUSTOMER' | 'GENERAL';

export type IDocument = {
  id: number;
  entityType: DocumentEntityType;
  entityId: number;
  fileName: string;
  fileUrl: string;
  mimeType?: string | null;
  fileSize?: number | null;
  uploadedAt: string;
};

type DocumentListSectionProps = {
  entityType: DocumentEntityType;
  entityIdField?: string;
  hideTitle?: boolean;
};

export const DocumentListSection = ({
  entityType,
  entityIdField = 'id',
  hideTitle = false
}: DocumentListSectionProps) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const [isLoading, setIsLoading] = useState(true);
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const record = useRecordContext();
  const entityId = record ? record[entityIdField] : undefined;

  const loadDocuments = () => {
    if (!entityId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    authFetch(`${API_BASE_URL}/documents?entityType=${entityType}&entityId=${entityId}`)
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch(() => notify('Failed to load documents', { type: 'error' }))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadDocuments();
  }, [entityId, entityType]);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !entityId) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('entityType', entityType);
    formData.append('entityId', String(entityId));

    setUploading(true);
    try {
      const response = await authFetch(`${API_BASE_URL}/documents/upload`, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      notify('Document uploaded', { type: 'success' });
      loadDocuments();
      refresh();
    } catch {
      notify('Failed to upload document', { type: 'error' });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const response = await authFetch(`${API_BASE_URL}/documents/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Delete failed');
      }
      notify('Document deleted', { type: 'success' });
      loadDocuments();
      refresh();
    } catch {
      notify('Failed to delete document', { type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Box>
      {!hideTitle && (
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Documents
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="text.secondary">
            Upload PDFs or images
          </Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            disabled={uploading || !entityId}
          >
            {uploading ? 'Uploading...' : 'Upload'}
            <input type="file" hidden onChange={handleUpload} accept="application/pdf,image/*" />
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        {isLoading ? (
          <CircularProgress size={24} />
        ) : documents.length === 0 ? (
          <Typography>No documents yet.</Typography>
        ) : (
          documents.map((doc) => (
            <Box
              key={doc.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1.5}
              p={1.5}
              sx={{
                borderRadius: 1,
                bgcolor: '#fff',
                border: '1px solid #eee'
              }}
            >
              <Box>
                <MuiLink href={doc.fileUrl} target="_blank" underline="hover" rel="noreferrer">
                  {doc.fileName}
                </MuiLink>
                <Typography variant="caption" color="text.secondary" display="block">
                  Uploaded {new Date(doc.uploadedAt).toLocaleString()}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => handleDelete(doc.id)}
                disabled={deletingId === doc.id}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
