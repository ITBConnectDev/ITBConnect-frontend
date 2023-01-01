import { Lexend, Rubik } from "@next/font/google";
import type { AppProps } from "next/app";
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
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </main>
  );
}

export default MyApp;
