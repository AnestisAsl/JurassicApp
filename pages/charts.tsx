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
  VictoryPolarAxis,
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
  const [continentDataChart, setContinentDataChart] = React.useState<
    { x: any; y: any }[]
  >([]);
  const continentsArray = ["America", "Europe", "Asia", "Oceania", "Africa"];
  const temperatureData = [
    { x: 252, y: 28 },
    { x: 242, y: 25 },
    { x: 201, y: 24 },
    { x: 175, y: 18 },
    { x: 145, y: 19 },
    { x: 76, y: 24 },
    { x: 66, y: 22.5 },
  ];
  const emeraldColor = "#34d399";
  React.useEffect(() => {
    console.log(`Option selected:`, selectedDinosaurs);
    if (selectedDinosaurs) {
      let tempArrayHeight: { dinosaur: any; height: any; label: any }[] = [];
      let tempArrayWeight: { dinosaur: any; weight: any; label: any }[] = [];
      let tempArrayDate: { x: any; y: any }[] = [];
      let tempArrayEra: { x: any; y: any }[] = [];
      let tempArrayContinent: { x: any; y: any }[] = [];

      let arrayEraCounter = [0, 0, 0];
      let arrayContinentCounter = [0, 0, 0, 0, 0];

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

        switch (dino.continent) {
          case "America":
            arrayContinentCounter[0]++;
            break;
          case "Europe":
            arrayContinentCounter[1]++;
            break;
          case "Asia":
            arrayContinentCounter[2]++;
            break;
          case "Oceania":
            arrayContinentCounter[3]++;
            break;
          case "Africa":
            arrayContinentCounter[4]++;
            break;
          default:
            console.log("default case switch");
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

      for (let i = 0; i < arrayContinentCounter.length; i++) {
        if (arrayContinentCounter[i] > 0) {
          tempArrayContinent.push({
            x: continentsArray[i],
            y: arrayContinentCounter[i],
          });
        }
      }
      setBarDataHeight(tempArrayHeight);
      setBarDataWeight(tempArrayWeight);
      setScatterDataDate(tempArrayDate);
      setPieEraData(tempArrayEra);
      setContinentDataChart(tempArrayContinent);
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
          continent: relatedFossil[0]?.location,
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
              data: { fill: emeraldColor },
            }}
            animate={{
              onExit: {
                duration: 500,
                before: () => ({
                  _y: 0,
                }),
              },
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
                          style: { fill: "tomato" },
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
            labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} />}
            data={barDataWeight}
            style={{
              data: { fill: emeraldColor },
            }}
            animate={{
              onExit: {
                duration: 500,
                before: () => ({
                  _y: 0,
                }),
              },
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
                          style: { fill: "tomato" },
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
              duration: 1000,
              onLoad: { duration: 1000 },
            }}
            style={{ data: { fill: emeraldColor } }}
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
                          return fill === "tomato"
                            ? null
                            : { style: { fill: "tomato" } };
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
        {selectedDinosaurs.length > 0 && (
          <VictoryPie
            colorScale={[emeraldColor, "tomato", "orange"]}
            data={pieEraData}
            innerRadius={68}
            labelRadius={80}
            animate={{
              duration: 2000,
            }}
          />
        )}
        {selectedDinosaurs.length == 0 && (
          <VictoryPie
            colorScale={[emeraldColor, "tomato", "orange"]}
            data={[{ x: "Choose a Dinosaur", y: 1 }]}
            innerRadius={68}
            labelRadius={80}
          />
        )}
      </div>
      <div className="w-screen  flex flex-row">
        {selectedDinosaurs.length > 1 && (
          <VictoryChart polar theme={VictoryTheme.material}>
            {continentDataChart.map((d, i) => {
              return (
                <VictoryPolarAxis
                  dependentAxis
                  key={i}
                  label={d.x + " : " + d.y}
                  labelPlacement="perpendicular"
                  style={{ tickLabels: { fill: "none" } }}
                  axisValue={d.x}
                />
              );
            })}
            <VictoryBar
              style={{ data: { fill: "tomato", width: 25 } }}
              data={continentDataChart}
              animate={{
                duration: 2000,
                easing: "bounce",
              }}
            />
          </VictoryChart>
        )}
        {selectedDinosaurs.length <= 1 && (
          <VictoryChart polar theme={VictoryTheme.material}>
            <VictoryPolarAxis
              dependentAxis
              label={"Choose two or more Dinosaurs"}
              labelPlacement="perpendicular"
              style={{ tickLabels: { fill: "none" } }}
              axisAngle={90}
            />
          </VictoryChart>
        )}
        <VictoryChart minDomain={{ y: 15 }}>
          <VictoryAxis
            label="Million years ago"
            style={{
              axis: { stroke: "black" },
              axisLabel: { fontSize: 12, padding: 30 },
              tickLabels: { fontSize: 15, padding: 5 },
            }}
          />
          <VictoryAxis
            dependentAxis
            label="Temperature in Celcius"
            style={{
              axis: { stroke: "black" },
              axisLabel: { fontSize: 13, padding: 30 },
              tickLabels: { fontSize: 15, padding: 5 },
            }}
          />
          <VictoryLine
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={temperatureData}
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
