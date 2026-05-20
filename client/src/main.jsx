import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import posthog from 'posthog-js';
import * as Sentry from '@sentry/react';

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: '/ingest',
  person_profiles: 'always',
});

Sentry.init({
  dsn: 'https://2d54b8f3776694c7419e834e7e1d5658@o4511413588459520.ingest.de.sentry.io/4511413598617680',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  environment: 'production',
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
