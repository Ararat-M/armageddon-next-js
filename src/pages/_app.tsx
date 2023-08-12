import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/global.scss";

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