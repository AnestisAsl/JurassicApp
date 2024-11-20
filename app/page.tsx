"use client";
import Image from "next/image";
import { gql, useQuery } from "@apollo/client";

const getData = gql`
  query {
    fossils {
      id
      dinosaurId
      location
      date
      paleontologists
      latitude
      longitude
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
export default function Home() {
  // const { data, error, loading } = useQuery(getData);
  // if (data) console.log("data : ", data);
  // if (error) console.log("error : ", data);
  return (
    <div>
      <h1>Paleontlogist</h1>
      <p>A few words</p>
    </div>
  );
}
