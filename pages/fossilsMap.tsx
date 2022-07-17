import * as React from "react";
import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ParallaxBanner } from "react-scroll-parallax";
import { gql, useQuery } from "@apollo/client";
import FossilsDetails from "../components/FosiilsDetails";
import FossilsDetailsAtImage from "../components/FosilDetailAtImage";
import { GiFossil } from "react-icons/gi";
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
      name
      height
      weight
      mesozoicEra
      facts
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
  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;
  return (
    <div className="w-full h-full flex  flex-col items-center justify-center font-MontserratAlternates">
      <Head>
        <title>Fossils</title>
      </Head>
      <h1 className="text-3xl">Fossils around the globe.</h1>
      <div className="flex flex-row">
        <GiFossil size={64} />
      </div>
      <h2 className="text-xl">Discoveries over the years.</h2>

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
                      dinosaurs={data.dinosaurs}
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
                        dinosaurs={data.dinosaurs}
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
                        dinosaurs={data.dinosaurs}
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
                        dinosaurs={data.dinosaurs}
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
                        dinosaurs={data.dinosaurs}
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
      <h1 className="text-3xl">More details</h1>
      <FossilsDetails
        fossils={data.fossils}
        dinosaurs={data.dinosaurs}
        continent="America"
      />
      <FossilsDetails
        fossils={data.fossils}
        dinosaurs={data.dinosaurs}
        continent="Europe"
      />
      <FossilsDetails
        fossils={data.fossils}
        dinosaurs={data.dinosaurs}
        continent="Asia"
      />
      <FossilsDetails
        fossils={data.fossils}
        dinosaurs={data.dinosaurs}
        continent="Africa"
      />
      <FossilsDetails
        fossils={data.fossils}
        dinosaurs={data.dinosaurs}
        continent="Oceania"
      />
    </div>
  );
};

export default FossilsMap;
