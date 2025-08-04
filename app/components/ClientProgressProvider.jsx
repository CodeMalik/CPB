// components/ClientProgressProvider.jsx
'use client';

import { AppProgressProvider } from '@bprogress/next';

export default function ClientProgressProvider({ children }) {
  return (
    <AppProgressProvider
      height="2px"
      color="pink"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </AppProgressProvider>
  );
}
