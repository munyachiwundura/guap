import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout'
import { Provider } from '../context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Provider>

    <Head>
        <link rel="icon" href="/icons/icon.png" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"/>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
    </>
  )
}

export default MyApp
