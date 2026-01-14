import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  useNotify,
  useRedirect,
  useEditController
} from 'react-admin';
import { Breadcrumbs, Container, Divider, Grid, Link as MuiLink, Typography } from '@mui/material';
import { PROJECT_CONTACT_STAGE_LABELS } from '../types/ProjectContactStage.ts';
import ProjectContactActivities from '../projects/components/ProjectContactActivities.tsx';
import { Link as RouterLink } from 'react-router';
import ConvertToOpportunityModal from './components/ConvertToOpportunityModal.tsx';

const ProjectContactEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const controller = useEditController();
  const record = controller.record;

  const stageChoices = Object.entries(PROJECT_CONTACT_STAGE_LABELS).map(([value, label]) => ({
    id: value,
    name: label
  }));

  return (
    <Container maxWidth="lg">
      {record && (
        <Breadcrumbs sx={{ mt: 2 }}>
          <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
            Dashboard
          </MuiLink>
          <MuiLink
            component={RouterLink}
            underline="hover"
            color="inherit"
            to={`/projects/${record.projectId}`}
          >
            Projects
          </MuiLink>
          <Typography color="text.primary">Project Contact</Typography>
        </Breadcrumbs>
      )}

      <Edit
        mutationMode="pessimistic"
        mutationOptions={{
          onSuccess: (data) => {
            notify('Project Contact updated', { type: 'success' });
            redirect(`/projects/${data.projectId}`);
          },
          onError: (error) => {
            notify(typeof error === 'string' ? error : 'Save failed', { type: 'error' });
          }
        }}
      >
        <SimpleForm>
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
              Project Contact Details
            </Typography>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="contact.firstName" helperText={false} disabled={true} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="contact.lastName" helperText={false} disabled={true} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <SelectInput
                  source="stage"
                  label="Stage"
                  choices={stageChoices}
                  fullWidth
                  helperText={false}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12 }}>
                <TextInput
                  source="notes"
                  label="General Notes"
                  multiline
                  rows={4}
                  fullWidth
                  helperText={false}
                />
              </Grid>
            </Grid>
            <Divider sx={{ marginY: 2 }} />
            <ProjectContactActivities />

            {record?.contactId && (
              <ConvertToOpportunityModal
                projectId={record.projectId}
                contactId={record.contactId}
                projectContactId={record.id}
              />
            )}
          </Container>
        </SimpleForm>
      </Edit>
    </Container>
  );
};

export default ProjectContactEdit;
