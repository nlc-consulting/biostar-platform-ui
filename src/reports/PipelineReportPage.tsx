import { PipelineReport } from '../components/reports/PipelineReport.tsx';
import { Box, Breadcrumbs, Container, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

const PipelineReportPage = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/reports">
          Reports
        </MuiLink>
        <Typography color="text.primary">Pipeline Report</Typography>
      </Breadcrumbs>
      <Box my={2}>
        <Typography variant="h4" gutterBottom>
          Pipeline Report
        </Typography>
        <PipelineReport />
      </Box>
    </Container>
  );
};

export default PipelineReportPage;
