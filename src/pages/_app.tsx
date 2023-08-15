import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/global.scss";
import "@/styles/index.module.scss";
import { BasketContext } from "@/context";
import { useState } from "react";
import Image from "next/image";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [basket, setBasket] = useState([]);

  return (
    <BasketContext.Provider
      value={{
        basket,
        setBasket
      }}
    >
      <Head>
        <title>ARMAGEDDON 2023</title>
      </Head>
      <Component {...pageProps} />
    </BasketContext.Provider>
  );
}