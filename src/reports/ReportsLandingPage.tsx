import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Breadcrumbs,
  Link as MuiLink,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router';

const ReportsLandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <Typography color="text.primary">Reports</Typography>
      </Breadcrumbs>
      <Box my={2}>
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>

        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Pipeline Report</Typography>
            <Button variant="contained" size="small" onClick={() => navigate('/reports/pipeline')}>
              View Report
            </Button>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Won Opportunities Report</Typography>
            <Button variant="contained" size="small" onClick={() => navigate('/reports/won')}>
              View Report
            </Button>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Introductions</Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/reports/introductions')}
            >
              View Report
            </Button>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Lost But Tracked Opportunities Report</Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/reports/lost-but-tracked')}
            >
              View Report
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ReportsLandingPage;
