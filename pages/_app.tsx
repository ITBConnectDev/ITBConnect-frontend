import { Lexend, Rubik } from "@next/font/google";
import type { AppProps } from "next/app";
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${rubik.variable} ${lexend.variable} font-lexend`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
