import React from "react";
import { gql, useQuery } from "@apollo/client";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";

const getDinos = gql`
  query {
    dinosaurs {
      id
      name
      height
      weight
      fossilLocation
      mesozoicEra
      facts
    }
  }
`;

const Home = () => {
  const { data, error, loading } = useQuery(getDinos);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;
  if (data) console.log("data : ", data);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen justify-center	">
      <h1 className="text-6xl	">Palentologist App</h1>
      <h2 className="text-3xl">Begin you Jurassic Journey Now</h2>
      <div className="flex flex-row items-center ">
        <button type="button" onClick={() => router.push("/charts")}>
          Charts
        </button>
        <button type="button" onClick={() => router.push("/fossilsMap")}>
          Map
        </button>
        <button type="button" onClick={() => router.push("/flows")}>
          Flows
        </button>
        <button type="button" onClick={() => router.push("/about")}>
          About
        </button>
      </div>
    </div>
  );
};

export default Home;
