import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import AddProjectContactSingleModal from './AddProjectContactSingleModal';
import { useRecordContext } from 'react-admin';
import { PaginatedProjectContacts } from './PaginatedProjectContacts';
import AddProjectGroupModal from './AddProjectGroupModal.tsx';

const ProjectContacts: React.FC = () => {
  const project = useRecordContext();

  if (!project?.id) return null;

  return (
    <Grid container spacing={2} mb={2}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle1" gutterBottom>
          Project Contacts
        </Typography>
        <PaginatedProjectContacts projectId={project.id as number} />
        <Box mb={2} display="flex" justifyContent="flex-end">
          <AddProjectContactSingleModal projectId={project.id as number} />
          <AddProjectGroupModal projectId={project.id as number} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProjectContacts;
