import { useRedirect, FunctionField, type FunctionFieldProps } from 'react-admin';
import { Link } from '@mui/material';

type RecordType = {
  id: number;
  contactId: number;
  displayName: string;
};

export const ContactNameLink = (props: Omit<FunctionFieldProps<RecordType>, 'render'>) => {
  const redirect = useRedirect();

  return (
    <FunctionField<RecordType>
      {...props}
      render={(record) => (
        <Link
          underline="hover"
          onClick={(e) => {
            e.stopPropagation();
            redirect('show', 'contacts', record.contactId);
          }}
          sx={{ cursor: 'pointer' }}
        >
          {record.displayName}
        </Link>
      )}
    />
  );
};
