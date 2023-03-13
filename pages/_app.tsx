import { Lexend, Rubik } from "@next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

const rubik = Rubik({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-rubik",
});

const lexend = Lexend({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lexend",
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${rubik.variable} ${lexend.variable} font-lexend`}>
      <Head>
        <title>ITBConnect</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <Script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></Script>
    </main>
  );
}

export default MyApp;
