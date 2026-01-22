import React, { useCallback, useEffect, useRef } from 'react';
import { AutocompleteInput, ReferenceInput, useDataProvider, useNotify } from 'react-admin';
import { Grid } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';

type CustomerRecord = {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  primaryEmail?: string | null;
  primaryPhone?: string | null;
  primaryStreet?: string | null;
  primaryCity?: string | null;
  primaryState?: string | null;
  primaryZip?: string | null;
};

const LeadCustomerSelect: React.FC = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const { getValues, setValue } = useFormContext();
  const customerId = useWatch({ name: 'customerId' });
  const hasInitialized = useRef(false);
  const lastSyncedId = useRef<number | null>(null);

  const applyUpdatesIfEmpty = useCallback(
    (updates: Record<string, string | null>) => {
      Object.entries(updates).forEach(([field, value]) => {
        if (value === null || value === undefined || value === '') {
          return;
        }
        const currentValue = getValues(field);
        if (currentValue !== null && currentValue !== undefined && currentValue !== '') {
          return;
        }
        setValue(field, value, { shouldDirty: true, shouldValidate: true });
      });
    },
    [getValues, setValue]
  );

  const applyCustomerDefaults = useCallback(
    (customer: CustomerRecord) => {
      const updates: Record<string, string | null> = {
        firstName: customer.firstName ?? null,
        lastName: customer.lastName ?? null,
        phone: customer.primaryPhone ?? null,
        email: customer.primaryEmail ?? null
      };

      applyUpdatesIfEmpty(updates);
    },
    [applyUpdatesIfEmpty]
  );

  const fetchAndApply = useCallback(
    async (id: number) => {
      try {
        const { data } = await dataProvider.getOne<CustomerRecord>('customers', { id });
        applyCustomerDefaults(data);
        lastSyncedId.current = id;
      } catch (error) {
        console.error('Failed to sync customer details', error);
        notify('Failed to sync customer', { type: 'error' });
      }
    },
    [applyCustomerDefaults, dataProvider, notify]
  );

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      return;
    }
    const numericId = typeof customerId === 'string' ? Number(customerId) : customerId;
    if (!numericId || !Number.isFinite(numericId)) {
      return;
    }
    if (lastSyncedId.current === numericId) {
      return;
    }
    fetchAndApply(numericId);
  }, [customerId, fetchAndApply]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid size={{ xs: 12, sm: 6 }}>
        <ReferenceInput source="customerId" reference="customers" label="Customer" fullWidth>
          <AutocompleteInput
            optionText={(record) => `${record.firstName ?? ''} ${record.lastName ?? ''}`.trim()}
            helperText={false}
            filterToQuery={(q) => ({ q })}
            fullWidth
          />
        </ReferenceInput>
      </Grid>
    </Grid>
  );
};

export default LeadCustomerSelect;
