"use client";
import { WeightHorizontalBarChart } from "@/customComponents/charts/weightHorizontalBarChart";
import { HeightBarChart } from "@/customComponents/charts/heigtBarChart";
import { PieMesozoicPeriodChart } from "@/customComponents/charts/pieMesozoicPediodChart";
import { LineTimeLineChart } from "@/customComponents/charts/lineTimeLineChart";

import { MultiSelect } from "@/components/multi-select";
import { useState } from "react";

import { gql, useQuery } from "@apollo/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorPage } from "@/customComponents/errorPage";
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
  const [selectedDinosaurs, setSelectedDinosaurs] = useState<string[]>([]);
  let dinosaursList = [];
  const { data, error, loading } = useQuery(getData);

  let weightHorizontalBarChartData = [];
  let heightBarChartData = [];
  let mesozoicPieChartData = [];
  let timeLineData = [];

  if (data) {
    console.log("api data : ", data);
    dinosaursList = data.dinosaurs;
    // console.log("selected: ", selectedDinosaurs);
    let color = 1;
    let mesozoicPeriodArray = [];
    for (const dino of data.dinosaurs) {
      if (color === 6) {
        color = 1;
      }
      if (selectedDinosaurs.length > 0) {
        if (selectedDinosaurs.includes(dino.id)) {
          let tempDinoObjWeight = {
            name: dino.name,
            weight: dino.weight,
            fill: `hsl(var(--chart-${color} ))`,
          };
          let tempDinoObjHeight = {
            name: dino.name,
            height: dino.height,
            fill: `hsl(var(--chart-${color} ))`,
          };
          let tempFossildate = 0;
          for (const fossil of data.fossils) {
            if (fossil.dinosaurId === dino.id) {
              tempFossildate = Number(fossil.date);
            }
          }
          let tempTimeLineObj = {
            dinosaurName: dino.name,
            date: tempFossildate,
            fill: `hsl(var(--chart-${color} ))`,
          };
          heightBarChartData.push(tempDinoObjHeight);
          weightHorizontalBarChartData.push(tempDinoObjWeight);
          mesozoicPeriodArray.push(dino.mesozoicEra);
          timeLineData.push(tempTimeLineObj);
        }
      } else {
        // default values
        let tempDinoObjWeight = {
          name: dino.name,
          weight: dino.weight,
          fill: `hsl(var(--chart-${color} ))`,
        };
        let tempDinoObjHeight = {
          name: dino.name,
          height: dino.height,
          fill: `hsl(var(--chart-${color} ))`,
        };
        let tempFossildate = 0;

        for (const fossil of data.fossils) {
          if (fossil.dinosaurId === dino.id) {
            tempFossildate = Number(fossil.date);
          }
        }
        let tempTimeLineObj = {
          dinosaurName: dino.name,
          date: tempFossildate,
          fill: `hsl(var(--chart-${color} ))`,
        };
        heightBarChartData.push(tempDinoObjHeight);
        weightHorizontalBarChartData.push(tempDinoObjWeight);
        mesozoicPeriodArray.push(dino.mesozoicEra);
        timeLineData.push(tempTimeLineObj);
      }

      color++;
    }
    color = 1;
    let mesozoicObj = mesozoicPeriodArray.reduce((acc: any, cur: any) => {
      acc[cur]
        ? acc[cur].dinosaurNumber++
        : (acc[cur] = {
            period: cur,
            dinosaurNumber: 1,
          });
      return acc;
    }, {});

    for (const property in mesozoicObj) {
      mesozoicObj[property].fill = `hsl(var(--chart-${color} ))`;
      mesozoicPieChartData.push(mesozoicObj[property]);
      color++;
      if (color === 6) {
        color = 1;
      }
    }
  }

  if (error) return <ErrorPage />;
  return (
    <div>
      {loading ? (
        <Button disabled>
          <Loader2 className="animate-spin" />
          Please wait
        </Button>
      ) : (
        <div className="p-4 w-full ">
          <div className="justify-self-center p-4">
            <h1 className="text-2xl font-bold mb-4">
              Select the dinosaurs you want to compare
            </h1>
            <MultiSelect
              options={dinosaursList}
              onValueChange={setSelectedDinosaurs}
              placeholder="Select Dinosaurs"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <WeightHorizontalBarChart data={weightHorizontalBarChartData} />
            <HeightBarChart data={heightBarChartData} />
            <PieMesozoicPeriodChart data={mesozoicPieChartData} />
            <LineTimeLineChart data={timeLineData} />
          </div>
        </div>
      )}
    </div>
  );
}
