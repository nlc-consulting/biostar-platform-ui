import { Login, LoginForm } from 'react-admin';
import { Box } from '@mui/material';
import logo from './assets/biostarr-logo-normal.webp';

const LoginPage = () => (
  <Login
    sx={{
      '& .RaLogin-avatar': {
        display: 'none'
      },
      '& .RaLogin-icon': {
        backgroundColor: 'transparent',
        width: 88,
        height: 88
      }
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 1 }}>
      <Box component="img" src={logo} alt="Biostar" sx={{ height: 64, width: 'auto' }} />
    </Box>
    <LoginForm
      sx={{
        '& .RaLoginForm-content': {
          paddingTop: 0
        }
      }}
    />
  </Login>
);

export default LoginPage;
