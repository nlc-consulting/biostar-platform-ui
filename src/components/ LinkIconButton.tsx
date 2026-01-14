import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useWatch } from 'react-hook-form';

interface Props {
  field: string;
  label?: string;
}

const normalizeUrl = (value: string): string => {
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `https://${value}`;
};

const LinkIconButton: React.FC<Props> = ({ field, label }) => {
  const rawValue = useWatch({ name: field });
  const normalized = normalizeUrl(rawValue);

  const isEmpty = !rawValue || rawValue.trim() === '';

  return (
    <Tooltip title={isEmpty ? `No ${label ?? 'link'} provided` : `Open ${label ?? 'link'}`}>
      <span>
        <IconButton
          component="a"
          href={normalized}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{ mt: 3, ml: 1 }}
        >
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default LinkIconButton;
