import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Parallax } from "react-scroll-parallax";

const About: NextPage = () => {
  return (
    <div className="w-full h-full flex  flex-col items-center justify-center font-MontserratAlternates">
      <Head>
        <title>About</title>
      </Head>
      <h1 className="text-xl font-black	">
        Some informations about how this app was created.{" "}
      </h1>
      <Parallax translateY={[20, -20]} translateX={[100, -100]}>
        <div className="py-10">
          <h2 className="text-xl font-semibold">Purpose</h2>
          <p className="text-lg">
            Just for practise purposes at modern web technologies.
          </p>{" "}
        </div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -50]}>
        <div className="py-10">
          <h2 className="text-xl font-semibold">Why dinosaurs</h2>
          <p className="text-lg">
            The first job i wanted to pursue as a kid was paleontologist...Yes i
            wanted to become footballer too
          </p>{" "}
        </div>
      </Parallax>
      <Parallax translateY={[20, -20]} translateX={[100, -50]}>
        <div className="py-10">
          <h2 className="text-xl font-semibold">Data accuracy.</h2>
          <p className="text-lg">
            The data were fetched from various sources with a simple google
            search.Informations
            <br /> is not the main cause of this application so dont take theese
            stats from granted.
          </p>
        </div>
      </Parallax>

      <h2 className="text-xl font-semibold">Tech Stack</h2>
      <h3 className="text-xl font-medium	underline	underline-offset-auto	">
        Frontend
      </h3>
      <li className="text-lg">Next.js</li>
      <li className="text-lg">TypeScript</li>
      <li className="text-lg">Three.js</li>
      <li className="text-lg">TailwindCSS</li>
      <li className="text-lg">react-three-fiber</li>
      <li className="text-lg">drei</li>
      <li className="text-lg">React-Scroll-Parallax</li>

      <h3 className="text-xl font-medium underline	underline-offset-auto	">
        Backend
      </h3>
      <li className="text-lg">PostgreSQL</li>
      <li className="text-lg">GraphQL</li>
      <li className="text-lg">Apollo</li>
      <li className="text-lg"> Prisma 2.0</li>
    </div>
  );
};

export default About;
