import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDataProvider } from 'react-admin';
import { useFormContext, useWatch } from 'react-hook-form';

type CustomerAddress = {
  primaryStreet?: string | null;
  primaryCity?: string | null;
  primaryState?: string | null;
  primaryZip?: string | null;
};

const LeadCustomerAddressButton: React.FC = () => {
  const dataProvider = useDataProvider();
  const { setValue } = useFormContext();
  const customerId = useWatch({ name: 'customerId' });
  const [address, setAddress] = useState<CustomerAddress | null>(null);

  useEffect(() => {
    const numericId = typeof customerId === 'string' ? Number(customerId) : customerId;
    if (!numericId || !Number.isFinite(numericId)) {
      setAddress(null);
      return;
    }

    dataProvider
      .getOne<CustomerAddress>('customers', { id: numericId })
      .then(({ data }) => setAddress(data))
      .catch(() => setAddress(null));
  }, [customerId, dataProvider]);

  const hasCustomerAddress =
    !!address &&
    [address.primaryStreet, address.primaryCity, address.primaryState, address.primaryZip].some(
      (value) => value !== null && value !== undefined && value !== ''
    );

  const handleApply = () => {
    if (!address) return;
    setValue('propertyStreet', address.primaryStreet ?? null, {
      shouldDirty: true,
      shouldValidate: true
    });
    setValue('propertyCity', address.primaryCity ?? null, {
      shouldDirty: true,
      shouldValidate: true
    });
    setValue('propertyState', address.primaryState ?? null, {
      shouldDirty: true,
      shouldValidate: true
    });
    setValue('propertyZip', address.primaryZip ?? null, {
      shouldDirty: true,
      shouldValidate: true
    });
  };

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handleApply}
      disabled={!customerId || !hasCustomerAddress}
    >
      Use customer address
    </Button>
  );
};

export default LeadCustomerAddressButton;
