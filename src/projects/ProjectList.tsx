import React, { useMemo } from 'react';
import {
  DateInput,
  Datagrid,
  DateField,
  EditButton,
  List,
  ShowButton,
  FunctionField,
  TextField,
  TextInput,
  SelectInput,
  TopToolbar,
  useListContext
} from 'react-admin';
import { Chip, Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';
import { getLossTypeColor } from '../types/LossTypeColors.ts';
import { LOSS_TYPE_CHOICES } from '../types/LossTypeChoices.ts';

const projectFilters = [
  <TextInput source="q" label="Search" alwaysOn key="q" />,
  <SelectInput source="lossType" label="Department" choices={LOSS_TYPE_CHOICES} alwaysOn key="lossType" />,
  <DateInput source="createdAt_gte" label="Created After" alwaysOn key="createdAt_gte" />,
  <DateInput source="createdAt_lte" label="Created Before" alwaysOn key="createdAt_lte" />
];

const SORT_OPTIONS = [
  { id: 'name:asc', label: 'Alphabetical (A–Z)' },
  { id: 'createdAt:desc', label: 'Newest' },
  { id: 'createdAt:asc', label: 'Oldest' },
  { id: 'lossType:asc', label: 'Department' }
];

const ProjectListActions = () => {
  const { sort, setSort } = useListContext();
  const optionIds = useMemo(() => SORT_OPTIONS.map((option) => option.id), []);
  const sortValue = `${sort.field}:${sort.order.toLowerCase()}`;
  const selectedValue = optionIds.includes(sortValue) ? sortValue : 'createdAt:desc';

  return (
    <TopToolbar>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Sort</InputLabel>
        <Select
          label="Sort"
          value={selectedValue}
          onChange={(event) => {
            const [field, order] = String(event.target.value).split(':');
            const nextOrder = order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
            setSort({ field, order: nextOrder });
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </TopToolbar>
  );
};

const ProjectList: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Projects' }
        ]}
      />
      <List
        filters={projectFilters}
        sort={{ field: 'createdAt', order: 'DESC' }}
        actions={<ProjectListActions />}
      >
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
