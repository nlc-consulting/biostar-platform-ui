import { Box, Breadcrumbs, Container, Link as MuiLink, Typography } from '@mui/material';
import { WonReport } from '../components/reports/WonReport.tsx';
import { Link as RouterLink } from 'react-router';

const WonReportPage = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/reports">
          Reports
        </MuiLink>
        <Typography color="text.primary">Won Report</Typography>
      </Breadcrumbs>
      <Box my={2}>
        <Typography variant="h4" gutterBottom>
          Won Report
        </Typography>
        <WonReport />
      </Box>
    </Container>
  );
};

export default WonReportPage;
