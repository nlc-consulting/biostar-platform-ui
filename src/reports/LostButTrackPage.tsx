import { Box, Breadcrumbs, Container, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import { LostButTrackReport } from '../components/reports/LostButTrackReport.tsx';

const LostButTrackPage = () => {
  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/reports">
          Reports
        </MuiLink>
        <Typography color="text.primary">Lost But Track Report</Typography>
      </Breadcrumbs>
      <Box my={2}>
        <Typography variant="h4" gutterBottom>
          Lost But Track Report
        </Typography>
        <LostButTrackReport />
      </Box>
    </Container>
  );
};

export default LostButTrackPage;
