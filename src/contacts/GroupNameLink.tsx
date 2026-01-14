import { useRedirect, useRecordContext } from 'react-admin';
import { Link } from '@mui/material';

export const GroupNameLink = () => {
  const record = useRecordContext();
  const redirect = useRedirect();

  if (!record?.groupId || !record.groupName) return null;

  return (
    <Link
      underline="hover"
      onClick={(e) => {
        e.stopPropagation(); // prevent row click if needed
        redirect('show', 'groups', record.groupId);
      }}
      sx={{ cursor: 'pointer' }}
    >
      {record.groupName}
    </Link>
  );
};
