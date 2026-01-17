import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Stack,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RecentLeadsReport from '../components/reports/RecentLeadsReport.tsx';

const DashboardPage = () => {

  return (
    <Box sx={{ mt: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6" gutterBottom>
                Recent Leads (Last 7 Days)
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Button variant="outlined" size="small" component={RouterLink} to="/leads">
                  View All Leads
                </Button>
              </Stack>
            </Box>
            <RecentLeadsReport days={7} />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default DashboardPage;
