import { useRedirect, useRecordContext } from 'react-admin';
import { Link } from '@mui/material';

export const DealNameLink = () => {
  const record = useRecordContext();
  const redirect = useRedirect();

  if (!record?.id || !record.dealName) return null;

  return (
    <Link
      underline="hover"
      onClick={(e) => {
        e.stopPropagation();
        redirect('show', 'opportunities', record.id);
      }}
      sx={{ cursor: 'pointer' }}
    >
      {record.dealName}
    </Link>
  );
};
