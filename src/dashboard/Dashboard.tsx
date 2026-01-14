import {
  Typography,
  Box,
  Container,
} from '@mui/material';

const DashboardPage = () => {
  // const [followUps, setFollowUps] = useState([]);
  // const [loadingFollowUps, setLoadingFollowUps] = useState(true);
  //
  // const fetchFollowUps = () => {
  //   authFetch(`${API_BASE_URL}/dashboard/follow-ups`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFollowUps(data);
  //     })
  //     .finally(() => setLoadingFollowUps(false));
  // };
  //
  // const loadDashboardData = async () => {
  //   await Promise.all([fetchFollowUps()]);
  // };
  //
  // const activityColumns: GridColDef[] = [
  //   { field: 'area', headerName: 'Area', width: 120 },
  //   {
  //     field: 'resourceName',
  //     headerName: 'Resource',
  //     width: 250,
  //     renderCell: (params) => {
  //       const item = params.row;
  //       if (item.area === 'tasks') {
  //         return <>{item.resourceName}</>;
  //       }
  //
  //       return (
  //         <MuiLink
  //           component={RouterLink}
  //           to={`/${item.resourcePath}/${item.resourceId}`}
  //           underline="hover"
  //         >
  //           {item.resourceName}
  //         </MuiLink>
  //       );
  //     }
  //   },
  //   { field: 'note', headerName: 'Note', flex: 1 },
  //   {
  //     field: 'followUpDate',
  //     headerName: 'Follow-Up Date',
  //     width: 180,
  //     renderCell: (params) => {
  //       const rawDate = params.value;
  //       if (!rawDate) return '';
  //
  //       const [year, month, day] = rawDate.split(/[- T:]/).map(Number);
  //       const followUp = new Date(year, month - 1, day);
  //       const now = new Date();
  //       const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //       const diffInDays = Math.floor(
  //         (followUp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  //       );
  //
  //       let color = 'green';
  //       if (diffInDays < 0) color = 'red';
  //       else if (diffInDays <= 2) color = 'orange';
  //
  //       return (
  //         <span style={{ color }}>
  //           {followUp.toLocaleDateString(undefined, {
  //             year: 'numeric',
  //             month: 'short',
  //             day: 'numeric'
  //           })}
  //         </span>
  //       );
  //     }
  //   },
  //   {
  //     field: 'actions',
  //     headerName: '',
  //     width: 100,
  //     sortable: false,
  //     renderCell: (params) => {
  //       const item = params.row;
  //       if (item.area === 'tasks') {
  //         return (
  //           <EditTaskButtonWithFetch
  //             onSaved={loadDashboardData}
  //             recordId={item.id}
  //             keyName={item.keyName}
  //             resource={item.resource}
  //           />
  //         );
  //       } else {
  //         return (
  //           <EditActivityButtonWithFetch
  //             onSaved={loadDashboardData}
  //             recordId={item.id}
  //             keyName={item.keyName}
  //             resource={item.resource}
  //           />
  //         );
  //       }
  //     }
  //   }
  // ];
  //
  // useEffect(() => {
  //   loadDashboardData();
  // }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        {/*<Card sx={{ mb: 4 }}>*/}
        {/*  <CardContent>*/}
        {/*    <Typography variant="h6" gutterBottom>*/}
        {/*      Activity Tracking*/}
        {/*    </Typography>*/}
        {/*    <AddTaskButton keyName={'taskId'} resource={'tasks'} onSaved={() => fetchFollowUps()} />*/}
        {/*    {loadingFollowUps ? (*/}
        {/*      <CircularProgress />*/}
        {/*    ) : (*/}
        {/*      <DataGrid*/}
        {/*        rows={followUps}*/}
        {/*        columns={activityColumns}*/}
        {/*        getRowId={(row) => `${row.area}-${row.id}`}*/}
        {/*        pageSizeOptions={[10, 25, 50]}*/}
        {/*        initialState={{*/}
        {/*          pagination: { paginationModel: { pageSize: 10, page: 0 } }*/}
        {/*        }}*/}
        {/*        disableRowSelectionOnClick*/}
        {/*      />*/}
        {/*    )}*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
        {/*<Card sx={{ mb: 4 }}>*/}
        {/*  <CardContent>*/}
        {/*    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>*/}
        {/*      <Typography variant="h6" gutterBottom>*/}
        {/*        Recently Open Opportunities (L15 Days)*/}
        {/*      </Typography>*/}
        {/*      <Stack direction="row" spacing={1} alignItems="center">*/}
        {/*        <PipelineReportEmailButton days="15" size="small" />*/}
        {/*        <Button*/}
        {/*          variant="outlined"*/}
        {/*          size="small"*/}
        {/*          component={RouterLink}*/}
        {/*          to="/reports/pipeline"*/}
        {/*        >*/}
        {/*          View Full Report*/}
        {/*        </Button>*/}
        {/*      </Stack>*/}
        {/*    </Box>*/}
        {/*    <PipelineReport isDashboard={true} showEmailButton={false}></PipelineReport>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
        {/*<Card sx={{ mb: 4 }}>*/}
        {/*  <CardContent>*/}
        {/*    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>*/}
        {/*      <Typography variant="h6" gutterBottom>*/}
        {/*        Recently Won Opportunities (L15 Days)*/}
        {/*      </Typography>*/}

        {/*      <MuiLink component={RouterLink} to="/reports/won" underline="hover">*/}
        {/*        View Full Report*/}
        {/*      </MuiLink>*/}
        {/*    </Box>*/}
        {/*    <WonReport isDashboard={true}></WonReport>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
        {/*<Card sx={{ mb: 4 }}>*/}
        {/*  <CardContent>*/}
        {/*    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>*/}
        {/*      <Typography variant="h6" gutterBottom>*/}
        {/*        Lost But Tracked Opportunities (Follow Up Within 90 Days)*/}
        {/*      </Typography>*/}

        {/*      <MuiLink component={RouterLink} to="/reports/lost-but-tracked" underline="hover">*/}
        {/*        View Full Report*/}
        {/*      </MuiLink>*/}
        {/*    </Box>*/}
        {/*    <LostButTrackReport isDashboard={true}></LostButTrackReport>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
        {/*<Card sx={{ mb: 4 }}>*/}
        {/*  <CardContent>*/}
        {/*    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>*/}
        {/*      <Typography variant="h6" gutterBottom>*/}
        {/*        Recent Introductions (L60 Days)*/}
        {/*      </Typography>*/}
        {/*      <MuiLink component={RouterLink} to="/reports/introductions" underline="hover">*/}
        {/*        View Full Report*/}
        {/*      </MuiLink>*/}
        {/*    </Box>*/}
        {/*    <IntroductionsReport isDashboard={true} />*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
      </Container>
    </Box>
  );
};

export default DashboardPage;
