import * as React from "react";
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ParallaxBanner } from "react-scroll-parallax";
import { gql, useQuery } from "@apollo/client";
import FossilsDetails from "../components/FosiilsDetails";
import FossilsDetailsAtImage from "../components/FosilDetailAtImage";
import {
  GiDinosaurBones,
  GiAmmoniteFossil,
  GiFossil,
  GiTripleClaws,
  GiMoonClaws,
  GiReptileTail,
} from "react-icons/gi";
import { SiFossilscm } from "react-icons/si";
import Error from "../components/Error";
import Loading from "../components/Loading";

const getFossils = gql`
  query {
    fossils {
      id
      dinosaurId
      location
      date
      paleontologists
    }
    dinosaurs {
      id
      height
    }
  }
`;

const FossilsMap: NextPage = () => {
  const [isShownFossilsListAm, setIsShownFossilsListAm] = useState(false);
  const [isShownFossilsListEu, setIsShownFossilsListEu] = useState(false);
  const [isShownFossilsListAf, setIsShownFossilsListAf] = useState(false);
  const [isShownFossilsListAs, setIsShownFossilsListAs] = useState(false);
  const [isShownFossilsListOc, setIsShownFossilsListOc] = useState(false);
  const { data, error, loading } = useQuery(getFossils);
  console.log(data);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;
  return (
    <div className="w-full h-full flex  flex-col items-center justify-center">
      <Head>
        <title>Fossils</title>
      </Head>
      <h1>Fossils around the globe.</h1>
      <div className="flex flex-row">
        <GiDinosaurBones size={64} />
        <SiFossilscm size={64} />
        <GiAmmoniteFossil size={64} />
        <GiFossil size={64} />
        <GiTripleClaws size={64} />
        <GiMoonClaws size={64} />
        <GiReptileTail size={64} />
      </div>
      <h2>Discoveries all over the years.</h2>

      <ParallaxBanner
        layers={[
          { image: "/Earth.jpg" },
          {
            speed: -10,
            children: (
              <div className="absolute inset-0 flex flex-row  items-center justify-center">
                <div>
                  <button
                    className="text-2xl text-white font-thin pr-72"
                    onMouseEnter={() => setIsShownFossilsListAm(true)}
                    onMouseLeave={() => setIsShownFossilsListAm(false)}
                  >
                    America
                  </button>
                  {isShownFossilsListAm && (
                    <FossilsDetailsAtImage
                      fossils={data.fossils}
                      continent="America"
                    />
                  )}
                </div>
                <div className="inset-0 flex flex-col  items-center justify-center">
                  <div className="pb-48">
                    <button
                      className="text-2xl text-white font-thin "
                      onMouseEnter={() => setIsShownFossilsListEu(true)}
                      onMouseLeave={() => setIsShownFossilsListEu(false)}
                    >
                      Europe
                    </button>
                    {isShownFossilsListEu && (
                      <FossilsDetailsAtImage
                        fossils={data.fossils}
                        continent="Europe"
                      />
                    )}
                  </div>
                  <div className="pb-28">
                    <button
                      className="text-2xl text-white font-thin"
                      onMouseEnter={() => setIsShownFossilsListAf(true)}
                      onMouseLeave={() => setIsShownFossilsListAf(false)}
                    >
                      Africa
                    </button>
                    {isShownFossilsListAf && (
                      <FossilsDetailsAtImage
                        fossils={data.fossils}
                        continent="Africa"
                      />
                    )}
                  </div>
                </div>
                <div className="inset-0 flex flex-col  items-center justify-center pl-72">
                  <div className="pb-48">
                    <button
                      className="text-2xl text-white font-thin"
                      onMouseEnter={() => setIsShownFossilsListAs(true)}
                      onMouseLeave={() => setIsShownFossilsListAs(false)}
                    >
                      Asia
                    </button>
                    {isShownFossilsListAs && (
                      <FossilsDetailsAtImage
                        fossils={data.fossils}
                        continent="Asia"
                      />
                    )}
                  </div>
                  <div>
                    <button
                      className="text-2xl text-white font-thin"
                      onMouseEnter={() => setIsShownFossilsListOc(true)}
                      onMouseLeave={() => setIsShownFossilsListOc(false)}
                    >
                      Oceania
                    </button>
                    {isShownFossilsListOc && (
                      <FossilsDetailsAtImage
                        fossils={data.fossils}
                        continent="Oceania"
                      />
                    )}
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        style={{ aspectRatio: "2 / 1" }}
      ></ParallaxBanner>
      <h1>More details</h1>
      <FossilsDetails fossils={data.fossils} continent="America" />
      <FossilsDetails fossils={data.fossils} continent="Europe" />
      <FossilsDetails fossils={data.fossils} continent="Asia" />
      <FossilsDetails fossils={data.fossils} continent="Africa" />
      <FossilsDetails fossils={data.fossils} continent="Oceania" />
      <Link href="/">Home</Link>
    </div>
  );
};

export default FossilsMap;
