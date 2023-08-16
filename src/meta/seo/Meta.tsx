import { getTitle } from "@/shared/lib/getTitle/getTitle";
import Head from "next/head";

interface IMeta {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function Meta({ children, title, description }: IMeta) {
  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
        {description ? (
          <>
            <meta name="description" content={description}/>
            <meta name="og:title" content={getTitle(title)}/>
            <meta name="og:description" content={description}/>
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow"/>
        )
        }
      </Head>
      {children}
    </>
  );
}