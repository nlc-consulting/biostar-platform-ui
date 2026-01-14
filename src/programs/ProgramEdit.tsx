import React from 'react';
import {
  Datagrid,
  DeleteButton,
  Edit,
  ReferenceManyField,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AddProgramServiceButton } from './components/AddProgramServiceButton.tsx';

const ProgramEdit: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Edit
        transform={(data) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { createdAt, updatedAt, ...rest } = data;
          return rest;
        }}
      >
        <SimpleForm>
          <Container maxWidth="md">
            <Typography variant="h5" gutterBottom>
              Program Details
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="name" helperText={false} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput source="description" helperText={false} />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Typography variant={'subtitle1'} gutterBottom>
                  Products
                </Typography>
                <ReferenceManyField
                  label="Products"
                  reference="program-services"
                  target="programId"
                >
                  <Datagrid
                    bulkActionButtons={false}
                    empty={
                      <Box>
                        <small>No products</small>
                      </Box>
                    }
                  >
                    <TextField source="name" />
                    <DeleteButton
                      mutationMode="pessimistic"
                      redirect={false}
                      label="Remove"
                      confirmTitle="Are you sure?"
                      confirmContent="This will remove the product from the program."
                    />
                  </Datagrid>
                </ReferenceManyField>
                <AddProgramServiceButton />
              </Grid>
            </Grid>
          </Container>
        </SimpleForm>
      </Edit>
    </Container>
  );
};

export default ProgramEdit;
