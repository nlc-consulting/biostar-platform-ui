import React from 'react';
import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbsNavProps = {
  items: BreadcrumbItem[];
};

const BreadcrumbsNav: React.FC<BreadcrumbsNavProps> = ({ items }) => {
  return (
    <Breadcrumbs sx={{ mt: 2 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        if (item.to && !isLast) {
          return (
            <MuiLink
              key={`${item.label}-${index}`}
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={item.to}
            >
              {item.label}
            </MuiLink>
          );
        }

        return (
          <Typography key={`${item.label}-${index}`} color="text.primary">
            {item.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
