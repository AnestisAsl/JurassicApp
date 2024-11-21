import { Component } from "@/customComponents/charts/chart";
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
export default function Page() {
  // const { data, error, loading } = useQuery(getData);
  // if (data) console.log("data : ", data);
  // if (error) console.log("error : ", data);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1>charts</h1>
      <Component />
    </div>
  );
}
