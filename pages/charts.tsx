import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import Error from "../components/Error";
import Loading from "../components/Loading";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryStack,
  VictoryArea,
  VictoryLine,
  VictoryLabel,
} from "victory";

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

const Charts: NextPage = () => {
  const { data, error, loading } = useQuery(getData);
  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;
  const barDataHeight = [
    {
      dinosaur: data.dinosaurs[0].name,
      height: data.dinosaurs[0].height,
      label: data.dinosaurs[0].height,
    },
    {
      dinosaur: data.dinosaurs[1].name,
      height: data.dinosaurs[1].height,
      label: data.dinosaurs[1].height,
    },
    {
      dinosaur: data.dinosaurs[2].name,
      height: data.dinosaurs[2].height,
      label: data.dinosaurs[2].height,
    },
    {
      dinosaur: data.dinosaurs[3].name,
      height: data.dinosaurs[3].height,
      label: data.dinosaurs[3].height,
    },
    {
      dinosaur: data.dinosaurs[4].name,
      height: data.dinosaurs[4].height,
      label: data.dinosaurs[4].height,
    },
  ];
  const barDataWeight = [
    {
      dinosaur: data.dinosaurs[0].name,
      weight: data.dinosaurs[0].weight,
      label: data.dinosaurs[0].weight,
    },
    {
      dinosaur: data.dinosaurs[1].name,
      weight: data.dinosaurs[1].weight,
      label: data.dinosaurs[1].weight,
    },
    {
      dinosaur: data.dinosaurs[2].name,
      weight: data.dinosaurs[2].weight,
      label: data.dinosaurs[2].weight,
    },
    {
      dinosaur: data.dinosaurs[3].name,
      weight: data.dinosaurs[3].weight,
      label: data.dinosaurs[3].weight,
    },
    {
      dinosaur: data.dinosaurs[4].name,
      weight: data.dinosaurs[4].weight,
      label: data.dinosaurs[4].weight,
    },
  ];
  return (
    <div className="w-full h-full flex  flex-col items-center justify-center font-MontserratAlternates ">
      <Head>
        <title>Charts</title>
      </Head>
      <div className="w-screen h-screen">
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis
            label="Dinosaurs"
            style={{
              axis: { stroke: "black" },
              axisLabel: { fontSize: 10, padding: 30 },
              tickLabels: { fontSize: 7, padding: 5 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Height in meters"
            style={{
              axis: { stroke: "black" },
              axisLabel: { fontSize: 10, padding: 30 },
              tickLabels: { fontSize: 7, padding: 5 },
            }}
          />
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            data={barDataHeight}
            style={{
              data: { fill: "rgb(16 185 129)" },
            }}
            x="dinosaur"
            y="height"
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => ({
                          style: { fill: "rgb(225 29 72)", width: 20 },
                        }),
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: true }),
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => {},
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: false }),
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </VictoryChart>
      </div>
      <div className="w-screen h-screen">
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis
            label="Dinosaurs"
            style={{
              axis: { stroke: "black" },
              axisLabel: { fontSize: 10, padding: 30 },
              tickLabels: { fontSize: 7, padding: 5 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Weight in kgs"
            style={{
              axis: { stroke: "black" },
              axisLabel: { fontSize: 10, padding: 30 },
              tickLabels: { fontSize: 7, padding: 5 },
            }}
          />
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            data={barDataWeight}
            style={{
              data: { fill: "rgb(16 185 129)" },
            }}
            x="dinosaur"
            y="weight"
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => ({
                          style: { fill: "rgb(225 29 72)", width: 20 },
                        }),
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: true }),
                      },
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => {},
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: false }),
                      },
                    ];
                  },
                },
              },
            ]}
          />
        </VictoryChart>
      </div>
      <div className="w-screen h-screen">
        <VictoryChart>
          <VictoryAxis
            label="Mesozoic Period"
            style={{
              axis: { stroke: "black" },
              axisLabel: { fontSize: 10, padding: 30 },
              tickLabels: { fontSize: 10, padding: 5 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Temperature in Celsius"
            style={{
              axis: { stroke: "black" },
              axisLabel: { fontSize: 10, padding: 30 },
              tickLabels: { fontSize: 7, padding: 5 },
            }}
          />
          <VictoryLine
            labels={() => ["Triassic", "Jurassic", "Cretaceous"]}
            labelComponent={
              <VictoryLabel
                dy={-10}
                textAnchor="end"
                backgroundStyle={[
                  { fill: "rgb(16 185 129)" },
                  { fill: "rgb(34 211 238)" },
                  { fill: "rgb(220 38 38)" },
                ]}
              />
            }
            style={{
              data: { stroke: "rgb(16 185 129)" },
            }}
            data={[
              { x: "start", y: 28 },
              { x: "end", y: 24 },
            ]}
          />
          <VictoryLine
            style={{
              data: { stroke: "rgb(34 211 238)" },
            }}
            data={[
              { x: "start", y: 24 },
              { x: "end", y: 19 },
            ]}
          />
          <VictoryLine
            style={{
              data: { stroke: "rgb(220 38 38)" },
            }}
            data={[
              { x: "start", y: 19 },
              { x: "end", y: 23 },
            ]}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default Charts;
