import '../index.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>RRP</title>
      </Head>
      <Component />
    </>
  );
}
