import { Button, FormDataConsumer } from 'react-admin';
import EmailIcon from '@mui/icons-material/Email';

export const EmailLinkButton = () => {
  return (
    <FormDataConsumer>
      {({ scopedFormData }) => {
        const email = scopedFormData?.email;

        return (
          <Button
            href={email ? `mailto:${email}` : undefined}
            startIcon={<EmailIcon />}
            size="small"
            sx={{ ml: 1, mt: 3 }}
            disabled={!email}
          >
            Email
          </Button>
        );
      }}
    </FormDataConsumer>
  );
};
