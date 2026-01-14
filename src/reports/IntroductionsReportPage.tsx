import { Box, Breadcrumbs, Container, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { IntroductionsReport } from '../components/reports/IntroductionsReport.tsx';

const IntroductionsReportPage = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/reports">
          Reports
        </MuiLink>
        <Typography color="text.primary">Introductions Report</Typography>
      </Breadcrumbs>
      <Box my={2}>
        <Typography variant="h4" gutterBottom>
          Introductions Report
        </Typography>
        <IntroductionsReport />
      </Box>
    </Container>
  );
};

export default IntroductionsReportPage;
