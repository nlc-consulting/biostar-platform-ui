import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AddSubgroupModal from './AddSubgroupModal.tsx';
import { useRecordContext } from 'react-admin';
import { PaginatedGroupSubgroups } from './PaginatedGroupSubgroups.tsx';

const GroupSubgroups: React.FC = () => {
  const group = useRecordContext();

  if (!group?.id) return null;

  return (
    <Grid container spacing={2} mb={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle1" gutterBottom>
          Subgroups
        </Typography>
        <PaginatedGroupSubgroups parentId={group.id as number} />
        <Box mb={2} display="flex" justifyContent="flex-end">
          <AddSubgroupModal parentId={group.id as number} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default GroupSubgroups;
