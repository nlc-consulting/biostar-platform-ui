import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppAdmin } from './Admin.tsx';
import * as Sentry from '@sentry/react';
import { clearAuthTokens } from './apiClient.ts';

Sentry.init({
  dsn: 'https://ab237b9825e5787f79b50e407967f2f2@o4504663736057856.ingest.us.sentry.io/4509769694380032',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

const appVersion = import.meta.env.VITE_APP_VERSION || 'dev';
const storedVersion = localStorage.getItem('appVersion');
if (storedVersion && storedVersion !== appVersion) {
  clearAuthTokens();
}
localStorage.setItem('appVersion', appVersion);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppAdmin />
  </StrictMode>
);
