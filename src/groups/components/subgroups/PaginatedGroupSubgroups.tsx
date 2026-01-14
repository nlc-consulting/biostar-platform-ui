import React from 'react';
import {
  Datagrid,
  TextField,
  EditButton,
  Pagination,
  useListController,
  ListContextProvider,
  ResourceContextProvider
} from 'react-admin';

interface Props {
  parentId: number;
}

export const PaginatedGroupSubgroups: React.FC<Props> = ({ parentId }) => {
  const resource = 'groups';

  const controllerProps = useListController({
    resource,
    filter: { parentId },
    sort: { field: 'name', order: 'ASC' },
    perPage: 10,
    disableSyncWithLocation: true
  });

  return (
    <ResourceContextProvider value={resource}>
      <ListContextProvider value={controllerProps}>
        <Datagrid rowClick="edit" bulkActionButtons={false} empty={<></>}>
          <TextField source="name" />
          <EditButton />
        </Datagrid>
        <Pagination />
      </ListContextProvider>
    </ResourceContextProvider>
  );
};
