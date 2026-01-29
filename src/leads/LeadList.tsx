import React from 'react';
import {
  BooleanField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  ShowButton,
  TextField,
  TextInput
} from 'react-admin';
import { Box, Chip, Container } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';
import { getLossTypeColor } from '../types/LossTypeColors.ts';

const leadFilters = [<TextInput source="q" label="Search" alwaysOn key="q" />];

const LeadList: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Leads' }
        ]}
      />
      <List filters={leadFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <DateField source="receivedAt" label="Received" />
          <BooleanField source="isEmergency" label="Emergency" />
          <TextField source="firstName" label="First Name" />
          <TextField source="lastName" label="Last Name" />
          <TextField source="leadSource" label="Source" />
          <FunctionField
            label="Loss Type"
            render={(record) => {
              const value = record?.lossType ?? '';
              if (!value) return '-';
              return (
                <Chip
                  size="small"
                  label={value}
                  sx={{ bgcolor: getLossTypeColor(value), color: '#fff' }}
                />
              );
            }}
          />
          <TextField source="status" label="Status" />
          <FunctionField
            label="Actions"
            render={(record) => (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ShowButton
                  record={record}
                  label=""
                  aria-label="View lead"
                  sx={{ minWidth: 0, p: 0.5 }}
                />
                <EditButton
                  record={record}
                  label=""
                  aria-label="Edit lead"
                  sx={{ minWidth: 0, p: 0.5 }}
                />
                <DeleteButton
                  record={record}
                  label=""
                  aria-label="Delete lead"
                  mutationMode="pessimistic"
                  sx={{ minWidth: 0, p: 0.5 }}
                />
              </Box>
            )}
          />
        </Datagrid>
      </List>
    </Container>
  );
};

export default LeadList;
