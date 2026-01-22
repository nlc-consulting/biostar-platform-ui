import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';

interface Props {
  days?: number;
}

const ProjectStatusCard = ({ days = 7 }: Props) => {
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    onHold: 0,
    completed: 0,
    cancelled: 0
  });

  useEffect(() => {
    authFetchJson(`${API_BASE_URL}/dashboard/project-stats?days=${days}`)
      .then(({ json }) => {
        setStats({
          total: json.total ?? 0,
          inProgress: json.inProgress ?? 0,
          onHold: json.onHold ?? 0,
          completed: json.completed ?? 0,
          cancelled: json.cancelled ?? 0
        });
      })
      .catch((error) => {
        console.error('Failed to load project stats', error);
      });
  }, [days]);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Project Status
        </Typography>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack
                sx={{
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 2
                }}
                spacing={0.5}
              >
                <Typography variant="caption" color="text.secondary">
                  In Progress
                </Typography>
                <Typography variant="h4">{stats.inProgress}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack
                sx={{
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 2
                }}
                spacing={0.5}
              >
                <Typography variant="caption" color="text.secondary">
                  On Hold
                </Typography>
                <Typography variant="h4">{stats.onHold}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack
                sx={{
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 2
                }}
                spacing={0.5}
              >
                <Typography variant="caption" color="text.secondary">
                  Completed
                </Typography>
                <Typography variant="h4">{stats.completed}</Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack
                sx={{
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 2
                }}
                spacing={0.5}
              >
                <Typography variant="caption" color="text.secondary">
                  Cancelled
                </Typography>
                <Typography variant="h4">{stats.cancelled}</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Stack
            sx={{
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              p: 2
            }}
            spacing={0.5}
          >
            <Typography variant="caption" color="text.secondary">
              Last {days} Days
            </Typography>
            <Typography variant="h4">{stats.total}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProjectStatusCard;
