import React from 'react';
import {
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
  required
} from 'react-admin';
import { Container, Grid, Typography } from '@mui/material';
import BreadcrumbsNav from '../components/BreadcrumbsNav.tsx';
import { USER_ROLE_CHOICES } from '../types/UserRoleChoices.ts';

const UserCreate: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <BreadcrumbsNav
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Users', to: '/users' },
          { label: 'Create' }
        ]}
      />
      <Create mutationMode="pessimistic" redirect="list">
        <SimpleForm>
          <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>
              Create User
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextInput source="fullName" label="Full Name" validate={required()} fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextInput source="email" label="Email" validate={required()} fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <SelectInput
                  source="role"
                  label="Role"
                  choices={USER_ROLE_CHOICES}
                  validate={required()}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextInput
                  source="password"
                  label="Password"
                  type="password"
                  validate={required()}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Container>
        </SimpleForm>
      </Create>
    </Container>
  );
};

export default UserCreate;
