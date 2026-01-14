import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useRecordContext } from 'react-admin';
import { PaginatedCompanyContacts } from './PaginatedCompanyContacts.tsx';
import ContactQuickAdd from '../../components/ra-forms/ContactQuickAdd.tsx';

const CompanyContacts: React.FC = () => {
  const company = useRecordContext();
  const [contactKey, setContactKey] = React.useState(0);

  if (!company?.id) return null;

  return (
    <Grid container spacing={2} mb={2}>
      <Grid size={{ xs: 12 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            Contacts
          </Typography>
          <ContactQuickAdd
            simple={false}
            companyId={company.id as number}
            onContactCreated={() => setContactKey((prev) => prev + 1)}
          />
        </Box>
        <PaginatedCompanyContacts companyId={company.id as number} key={contactKey} />
      </Grid>
    </Grid>
  );
};

export default CompanyContacts;
