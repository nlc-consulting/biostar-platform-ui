import React from 'react';
import {
  Datagrid,
  BooleanField,
  Pagination,
  TextField,
  useListController,
  ListContextProvider,
  ResourceContextProvider,
  useRecordContext
} from 'react-admin';

import { EventInviteActions } from './EventInviteActions.tsx';
import { Box } from '@mui/material';

export const PaginatedEventInvites: React.FC = () => {
  const resource = 'group-event-invites';

  const event = useRecordContext();
  const eventId = event?.id; // ← use it directly

  const controller = useListController({
    resource,
    filter: { eventId },
    sort: { field: 'contactName', order: 'ASC' },
    perPage: 10,
    disableSyncWithLocation: true
  });

  return (
    <ResourceContextProvider value={resource}>
      <ListContextProvider value={controller}>
        <Box width="100%">
          <Datagrid bulkActionButtons={false} empty={<></>}>
            <TextField source="contactName" label="Name" />
            <BooleanField source="registered" label="Registered" />
            <BooleanField source="attended" label="Attended" />
            <EventInviteActions />
          </Datagrid>
          <Pagination />
        </Box>
      </ListContextProvider>
    </ResourceContextProvider>
  );
};
