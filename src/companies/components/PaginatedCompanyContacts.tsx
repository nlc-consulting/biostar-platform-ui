import React from 'react';
import {
  Datagrid,
  EmailField,
  Pagination,
  TextField,
  useListController,
  ListContextProvider,
  ResourceContextProvider
} from 'react-admin';
import { ContactNameLink } from './ContactNameLink.tsx';

interface Props {
  companyId: number;
}

export const PaginatedCompanyContacts: React.FC<Props> = ({ companyId }) => {
  const resource = 'company-contacts';

  const controllerProps = useListController({
    resource,
    filter: { companyId },
    sort: { field: 'displayName', order: 'ASC' },
    perPage: 10,
    disableSyncWithLocation: true
  });

  return (
    <ResourceContextProvider value={resource}>
      <ListContextProvider value={controllerProps}>
        <Datagrid bulkActionButtons={false} empty={<>No Contacts</>}>
          <ContactNameLink source="displayName" label="Name" sortable />
          <EmailField source="primaryEmail" label="Email" />
          <TextField source="primaryPhone" label="Phone" />
        </Datagrid>
        <Pagination />
      </ListContextProvider>
    </ResourceContextProvider>
  );
};
