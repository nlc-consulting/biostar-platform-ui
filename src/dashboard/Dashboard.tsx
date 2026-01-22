import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  Stack,
  Button,
  Grid,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RecentLeadsReport from '../components/reports/RecentLeadsReport.tsx';
import LeadStatsCard from '../components/reports/LeadStatsCard.tsx';
import RecentProjectsReport from '../components/reports/RecentProjectsReport.tsx';
import ProjectStatusCard from '../components/reports/ProjectStatusCard.tsx';

const DashboardPage = () => {

  return (
    <Box sx={{ mt: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" gutterBottom>
                    Recent Leads (Last 7 Days)
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      variant="contained"
                      size="small"
                      component={RouterLink}
                      to="/leads/create"
                    >
                      Create Lead
                    </Button>
                    <Button variant="outlined" size="small" component={RouterLink} to="/leads">
                      View All Leads
                    </Button>
                  </Stack>
                </Box>
                <RecentLeadsReport days={7} limit={10} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <LeadStatsCard days={7} />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" gutterBottom>
                    Recent Projects (Last 7 Days)
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                      variant="contained"
                      size="small"
                      component={RouterLink}
                      to="/projects/create"
                    >
                      Create Project
                    </Button>
                    <Button variant="outlined" size="small" component={RouterLink} to="/projects">
                      View All Projects
                    </Button>
                  </Stack>
                </Box>
                <RecentProjectsReport days={7} limit={10} />
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ProjectStatusCard days={7} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
