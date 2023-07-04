import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { GiFossil } from "react-icons/gi";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const FossilsMap: NextPage = () => {
  return (
    <div className="w-full h-screen flex  flex-col items-center  font-MontserratAlternates">
      <Head>
        <title>Fossils</title>
      </Head>
      <h1 className="text-3xl py-3.5">Fossils around the globe.</h1>
      <h2>
        Click on the following icon anywhere in the map to get more infos!
      </h2>
      <div className="flex flex-row py-2.5">
        <GiFossil size={64} />
      </div>
      <h2 className="text-xl py-3.5">Discoveries over the years.</h2>
      <Map />
    </div>
  );
};

export default FossilsMap;
