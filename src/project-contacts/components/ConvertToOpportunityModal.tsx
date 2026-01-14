import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';
import { useCreate, useNotify, useRefresh, useGetOne, useUpdate } from 'react-admin';
import { FormDataConsumer, ReferenceInput, SelectInput } from 'react-admin';

const ConvertToOpportunityModal = ({
  projectId,
  contactId,
  projectContactId
}: {
  projectId: number;
  contactId: number;
  projectContactId: number;
}) => {
  const [open, setOpen] = useState(false);
  const [programId, setProgramId] = useState<number | null>(null);
  const [programServiceId, setProgramServiceId] = useState<number | null>(null);
  const [create] = useCreate();
  const [update] = useUpdate();
  const notify = useNotify();
  const refresh = useRefresh();

  const { data: contact } = useGetOne('contacts', { id: contactId }, { enabled: !!contactId });
  const { data: program } = useGetOne('programs', { id: programId }, { enabled: !!programId });

  const handleConvert = async () => {
    if (!programId || !programServiceId || !programId) {
      notify('Please select both Program and Service', { type: 'warning' });
      return;
    }

    try {
      const dealName =
        `${contact?.firstName || ''} ${contact?.lastName || ''} - ${program?.name || 'Program'}`.trim();

      // 1. Create Opportunity
      await create(
        'opportunities',
        {
          data: {
            // tenantId: 1,
            contactId,
            programId,
            programServiceId,
            dateOpened: new Date().toISOString().split('T')[0],
            dealName,
            status: 'OPEN',
            opportunityStageId: 2 // 👈 Hardcoded stage ID for "Initial Communication"
          }
        },
        { returnPromise: true }
      );

      // 2. Update ProjectContact stage to 'YES'
      await update(
        'project-contacts',
        {
          id: projectContactId,
          data: {
            projectId,
            contactId,
            stage: 'YES'
          }
        },
        { mutationMode: 'pessimistic', returnPromise: true }
      );

      notify('Opportunity created and stage updated', { type: 'success' });
      refresh();
      setOpen(false);
    } catch (err) {
      console.error(err);
      notify('Failed to convert to opportunity', { type: 'error' });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mt: 2 }}>
        Convert to Opportunity
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Convert to Opportunity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <ReferenceInput source="programId" reference="programs" fullWidth>
                <SelectInput
                  optionText="name"
                  fullWidth
                  onChange={(e) => setProgramId(Number(e.target.value))}
                />
              </ReferenceInput>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormDataConsumer>
                {() => (
                  <ReferenceInput
                    key={`programService-${programId}`}
                    source="programServiceId"
                    reference="program-services"
                    filter={{ programId }}
                    fullWidth
                  >
                    <SelectInput
                      optionText="name"
                      fullWidth
                      onChange={(e) => setProgramServiceId(Number(e.target.value))}
                    />
                  </ReferenceInput>
                )}
              </FormDataConsumer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConvert}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConvertToOpportunityModal;
