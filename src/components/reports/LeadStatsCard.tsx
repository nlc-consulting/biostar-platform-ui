import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { API_BASE_URL, authFetchJson } from '../../apiClient.ts';
import type { LeadRow } from '../../types/LeadRow.ts';

interface Props {
  days?: number;
}

const LeadStatsCard = ({ days = 7 }: Props) => {
  const [total, setTotal] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [yesterdayCount, setYesterdayCount] = useState(0);

  useEffect(() => {
    authFetchJson(`${API_BASE_URL}/dashboard/recent-leads?days=${days}`)
      .then(({ json }) => {
        const rows = Array.isArray(json) ? (json as LeadRow[]) : [];
        setTotal(rows.length);

        const today = new Date();
        const startOfToday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        const startOfYesterday = new Date(startOfToday);
        startOfYesterday.setDate(startOfYesterday.getDate() - 1);

        let todayHits = 0;
        let yesterdayHits = 0;

        rows.forEach((row) => {
          const dateValue = row.receivedAt || row.createdAt;
          if (!dateValue) {
            return;
          }
          const leadDate = new Date(dateValue);
          if (Number.isNaN(leadDate.getTime())) {
            return;
          }
          if (leadDate >= startOfToday) {
            todayHits += 1;
          } else if (leadDate >= startOfYesterday && leadDate < startOfToday) {
            yesterdayHits += 1;
          }
        });

        setTodayCount(todayHits);
        setYesterdayCount(yesterdayHits);
      })
      .catch((error) => {
        console.error('Failed to load lead stats', error);
      });
  }, [days]);

  const Sparkline = () => (
    <svg width="140" height="40" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
      <polyline
        fill="none"
        stroke="#1b5e20"
        strokeWidth="2"
        points="0,28 12,26 24,24 36,22 48,18 60,16 72,14 84,16 96,12 108,10 120,8 132,6 140,8"
      />
    </svg>
  );

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Lead Stats
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
                  Today
                </Typography>
                <Typography variant="h4">{todayCount}</Typography>
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
                  Yesterday
                </Typography>
                <Typography variant="h4">{yesterdayCount}</Typography>
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
            spacing={1}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <div>
                <Typography variant="caption" color="text.secondary">
                  Last {days} Days
                </Typography>
                <Typography variant="h4">{total}</Typography>
              </div>
              <Sparkline />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LeadStatsCard;
