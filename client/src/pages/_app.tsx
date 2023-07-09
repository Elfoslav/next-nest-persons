import React from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '@/app/Layout';
import type { AppProps } from 'next/app';
import '@/app/globals.css';
import { SidebarProvider } from '@/app/components/SidebarContext';

export const metadata = {
  title: 'Persons list in Next.js',
  description: 'Created by Tomas Hromnik',
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add more metadata tags here */}
      </Head>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </SidebarProvider>
      </QueryClientProvider>
    </>
  )
}
