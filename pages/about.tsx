import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      <h1>welcome about </h1>
      <Link href="/">back</Link>
    </div>
  );
};

export default About;
