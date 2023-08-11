import type { AppProps as nextAppProps } from "next/app";
import Head from "next/head";

interface AppProps extends nextAppProps {
  title?: string;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ARMAGEDDON 2023</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}