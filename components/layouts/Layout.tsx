import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Box } from "@mui/material";

import { Navbar } from '../ui';

type LayoutProps = {
  title?: string;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ title = 'OpenJira', children }) => {
  return (
    <Box sx={{
      flexFlow: 1
    }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <Box sx={{
        padding: '10px 20px'
      }}>
        {children}
      </Box>
    </Box>
  );
};
