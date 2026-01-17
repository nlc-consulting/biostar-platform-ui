import React from 'react';
import { Box, Typography } from '@mui/material';

type FieldRowProps = {
  label: string;
  value?: React.ReactNode;
};

const FieldRow: React.FC<FieldRowProps> = ({ label, value }) => {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value ?? '-'}</Typography>
    </Box>
  );
};

export default FieldRow;
