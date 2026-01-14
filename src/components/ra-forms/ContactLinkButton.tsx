import ContactsIcon from '@mui/icons-material/Contacts';
import { useFormContext } from 'react-hook-form';
import { IconButton, Tooltip } from '@mui/material';

export const ContactLinkButton = () => {
  const { getValues } = useFormContext();
  const contactId = getValues('contactId');

  return (
    <Tooltip title="View Contact">
      <span>
        <IconButton
          component="a"
          href={`/#/contacts/${contactId}`}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          color="primary"
          sx={{ ml: 1, mt: 3 }}
          disabled={!contactId}
        >
          <ContactsIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
};
