import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'react-admin';
import { Container } from '@mui/material';

const OpportunityList: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <List>
        <Datagrid rowClick="edit">
          <TextField source="name" />
          <TextField source="description" />
          <EditButton />
        </Datagrid>
      </List>
    </Container>
  );
};

export default OpportunityList;
