import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Select from "react-select";
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryAxis,
  VictoryTheme,
  VictoryScatter,
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
  const [selectedDinosaurs, setSelectedDinosaurs] = React.useState([]);
  const dinoOptions: any = [];
  const [barDataHeight, setBarDataHeight] = React.useState<
    { dinosaur: any; height: any; label: any }[]
  >([]);
  const [barDataWeight, setBarDataWeight] = React.useState<
    { dinosaur: any; weight: any; label: any }[]
  >([]);
  const [scatterDataDate, setScatterDataDate] = React.useState<
    { x: any; y: any }[]
  >([]);
  const [pieEraData, setPieEraData] = React.useState<{ x: any; y: any }[]>([]);
  React.useEffect(() => {
    console.log(`Option selected:`, selectedDinosaurs);
    if (selectedDinosaurs) {
      let tempArrayHeight: { dinosaur: any; height: any; label: any }[] = [];
      let tempArrayWeight: { dinosaur: any; weight: any; label: any }[] = [];
      let tempArrayDate: { x: any; y: any }[] = [];
      let tempArrayEra: { x: any; y: any }[] = [];
      let arrayEraCounter = [0, 0, 0];
      selectedDinosaurs.forEach((dino: any) => {
        console.log(dino);
        tempArrayHeight.push({
          dinosaur: dino.label,
          height: dino.height,
          label: dino.height,
        });
        tempArrayWeight.push({
          dinosaur: dino.label,
          weight: dino.weight,
          label: dino.weight,
        });
        tempArrayDate.push({
          x: dino.label,
          y: dino.fossilDate,
        });
        if (dino.mesozoicEra === "Cretaceous") {
          arrayEraCounter[0]++;
        } else if (dino.mesozoicEra === "Triassic") {
          arrayEraCounter[1]++;
        } else {
          arrayEraCounter[2]++;
        }
      });
      if (arrayEraCounter[0] > 0) {
        tempArrayEra.push({
          x: "Cretaceous",
          y: arrayEraCounter[0],
        });
      }
      if (arrayEraCounter[1] > 0) {
        tempArrayEra.push({
          x: "Triassic",
          y: arrayEraCounter[1],
        });
      }
      if (arrayEraCounter[2] > 0) {
        tempArrayEra.push({
          x: "Jurassic",
          y: arrayEraCounter[2],
        });
      }
      setBarDataHeight(tempArrayHeight);
      setBarDataWeight(tempArrayWeight);
      setScatterDataDate(tempArrayDate);
      setPieEraData(tempArrayEra);
      console.log("available dinoOptions : ", dinoOptions);
    }
  }, [selectedDinosaurs]);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} />;
  if (data) {
    if (data.dinosaurs && data.fossils) {
      for (const d of data.dinosaurs) {
        let relatedFossil = data.fossils.filter((fossil: any) => {
          {
            return fossil.dinosaurId === d.id;
          }
        });
        dinoOptions.push({
          height: d?.height,
          label: d?.name,
          weight: d?.weight,
          value: d?.id,
          fossilDate: relatedFossil[0]?.date,
          mesozoicEra: d?.mesozoicEra,
        });
      }
    }
  }

  const setDinosaurs = (selectedOption: any) => {
    setSelectedDinosaurs(selectedOption);
  };

  return (
    <div className="w-full h-full flex  flex-col items-center justify-center font-MontserratAlternates ">
      <Head>
        <title>Charts</title>
      </Head>
      <div className="w-96 py-10">
        <Select
          options={dinoOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          isMulti
          name="Dinosaurs"
          onChange={(choice) => setDinosaurs(choice)}
        />
      </div>
      <div className="w-screen  flex flex-row">
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
            label="Date of first fossil found"
            style={{
              axis: { stroke: "black" },
              axisLabel: { fontSize: 10, padding: 30 },
              tickLabels: { fontSize: 7, padding: 5 },
            }}
          />

          <VictoryScatter
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            style={{ data: { fill: "#c43a31" } }}
            size={7}
            labels={() => null}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          const fill = props.style && props.style.fill;
                          return fill === "black"
                            ? null
                            : { style: { fill: "black" } };
                        },
                      },
                      {
                        target: "labels",
                        mutation: (props) => {
                          return props.text === props.data[props.index].y
                            ? null
                            : { text: props.data[props.index].y };
                        },
                      },
                    ];
                  },
                },
              },
            ]}
            data={scatterDataDate}
          />
        </VictoryChart>
        <VictoryPie
          colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
          data={pieEraData}
          animate={{
            duration: 2000,
          }}
        />
      </div>
      <div className="w-screen  flex flex-row">
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
    </div>
  );
};

export default Charts;
