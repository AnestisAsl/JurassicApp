import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Dinosaur {
    id: Int
    name: String
    height: Int
    weight: Int
    fossilLocation: String
    mesozoicEra: String
    facts: String
  }
  type Fossil {
    id: Int
    dinosaurId: Int
    location: String
    date: String
    paleontologists: String
    latitude: Float
    longitude: Float
  }
  type Query {
    dinosaurs: [Dinosaur]!
    fossils: [Fossil]!
  }
`;
