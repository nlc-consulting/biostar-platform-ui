import React from 'react';
import { BooleanInput, Create, SimpleForm, TextInput } from 'react-admin';

import { Container } from '@mui/material';

const GroupEdit: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Create>
        <SimpleForm>
          <Container maxWidth="lg">
            <TextInput source="name" />
            <BooleanInput source="isPond" label="Pond" />
          </Container>
        </SimpleForm>
      </Create>
    </Container>
  );
};

export default GroupEdit;
