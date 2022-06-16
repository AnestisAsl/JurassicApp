import type { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";
import { ParallaxProvider } from "react-scroll-parallax";
import apolloClient from "../lib/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ParallaxProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ParallaxProvider>
    </ApolloProvider>
  );
}

export default MyApp;
