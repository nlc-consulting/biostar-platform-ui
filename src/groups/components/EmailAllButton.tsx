import { Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useGetList } from 'react-admin';

export const EmailAllButton: React.FC<{ groupId: number }> = ({ groupId }) => {
  const { data: contacts = [], isLoading } = useGetList('group-contacts', {
    filter: { groupId },
    pagination: { page: 1, perPage: 1000 },
    sort: { field: 'firstName', order: 'ASC' }
  });

  if (isLoading || contacts.length === 0) return null;

  const emails = contacts.map((c) => c.primaryEmail?.trim()).filter(Boolean);

  const outlookMailto = `mailto:${emails.join(';')}`;
  return (
    <Button variant="outlined" startIcon={<EmailIcon />} component="a" href={outlookMailto}>
      Email All
    </Button>
  );
};
