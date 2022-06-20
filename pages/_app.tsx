import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { UIProvider } from '../context/ui';
import { darkTheme } from '../themes';

import '../styles/globals.css';
import { EntriesProvider } from '../context/entries';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}

export default MyApp
