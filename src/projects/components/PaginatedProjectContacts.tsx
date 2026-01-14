import React from 'react';
import {
  Datagrid,
  TextField,
  EditButton,
  Pagination,
  useListController,
  ListContextProvider,
  ResourceContextProvider,
  DateField
} from 'react-admin';

interface Props {
  projectId: number;
}

export const PaginatedProjectContacts: React.FC<Props> = ({ projectId }) => {
  const resource = 'project-contacts';

  const controllerProps = useListController({
    resource,
    filter: { projectId },
    sort: { field: 'lastActivityDate', order: 'DESC' },
    perPage: 10,
    disableSyncWithLocation: true
  });

  return (
    <ResourceContextProvider value={resource}>
      <ListContextProvider value={controllerProps}>
        <Datagrid rowClick="edit" bulkActionButtons={false} empty={<></>}>
          <TextField source="contactFullName" />
          <TextField source="stage" />
          <DateField source="lastActivityDate" />
          <EditButton />
        </Datagrid>
        <Pagination />
      </ListContextProvider>
    </ResourceContextProvider>
  );
};
