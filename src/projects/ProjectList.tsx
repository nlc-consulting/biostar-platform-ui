import React from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  ShowButton,
  FunctionField,
  TextField,
  TextInput,
  SelectInput
} from 'react-admin';
import { Chip, Container } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';
import { LOSS_TYPE_CHOICES } from '../types/LossTypeChoices.ts';
import { getLossTypeColor } from '../types/LossTypeColors.ts';

const projectFilters = [
  <TextInput source="q" label="Search" alwaysOn key="q" />,
  <SelectInput source="lossType" label="Department" choices={LOSS_TYPE_CHOICES} alwaysOn key="lossType" />
];


const ProjectList: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Projects' }
        ]}
      />
      <List filters={projectFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
        <Datagrid rowClick="show" bulkActionButtons={false}>
          <TextField source="name" label="Project" />
          <TextField source="status" label="Status" />
          <TextField source="customer.firstName" label="Customer First" />
          <TextField source="customer.lastName" label="Customer Last" />
          <FunctionField
            label="Loss Type"
            render={(record) => {
              const value = record?.lossType ?? '';
              const color = getLossTypeColor(value);
              return value ? (
                <Chip
                  size="small"
                  label={value}
                  sx={{ bgcolor: color, color: '#fff' }}
                />
              ) : (
                '-'
              );
            }}
          />
          <TextField source="propertyCity" label="City" />
          <DateField source="createdAt" label="Created" />
          <ShowButton />
          <EditButton />
        </Datagrid>
      </List>
    </Container>
  );
};

export default ProjectList;
