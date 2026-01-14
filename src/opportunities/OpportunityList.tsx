import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  TextField,
  SelectInput,
  DateField,
  ReferenceInput,
  FunctionField
} from 'react-admin';
import { Breadcrumbs, Container, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';
import {
  OPPORTUNITY_STATUS_CHOICES,
  OPPORTUNITY_STATUS_LABELS
} from '../types/OpportunityStatusChoices.ts';

const OpportunityList: React.FC = () => {
  const opportunityFilters = [
    <SelectInput
      key="status"
      source="status"
      label="Status"
      choices={OPPORTUNITY_STATUS_CHOICES}
      alwaysOn
    />,
    <ReferenceInput
      key="stage"
      source="opportunityStageId"
      reference="opportunity-stages"
      label="Stage"
      alwaysOn
    >
      <SelectInput optionText="name" />
    </ReferenceInput>
  ];

  type OpportunityRecord = {
    status: keyof typeof OPPORTUNITY_STATUS_LABELS;
  };

  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ mt: 2 }}>
        <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
          Dashboard
        </MuiLink>
        <Typography color="text.primary">Opportunities</Typography>
      </Breadcrumbs>
      <List filters={opportunityFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick="edit" bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="contactFullName" label="Contact" />
          <FunctionField
            label="Status"
            render={(record: OpportunityRecord) => {
              const label = OPPORTUNITY_STATUS_LABELS[record.status];
              return label ?? record.status;
            }}
          />
          <TextField source="opportunityStage.name" label="Stage" />
          <TextField source="opportunityServiceNames" label="Programs" />
          <DateField
            source="dateOpened"
            label="Opened"
            locales="en-US"
            options={{ year: 'numeric', month: 'short', day: 'numeric' }} // e.g. Jul 21, 2025
          />
          <DateField
            source="dateClosed"
            label="Closed"
            locales="en-US"
            options={{ year: 'numeric', month: 'short', day: 'numeric' }}
          />

          <EditButton />
        </Datagrid>
      </List>
    </Container>
  );
};

export default OpportunityList;
