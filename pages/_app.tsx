import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout';
import { Provider } from '../context';
import { SessionContextValue, SessionProvider } from 'next-auth/react';

type Props = {
  session: SessionContextValue;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Provider>
          <Head>
            <link rel="icon" href="/icons/icon.png" />

            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
