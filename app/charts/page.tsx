"use client";
import { Component } from "@/customComponents/charts/chart";
import { WeightHorizontalBarChart } from "@/customComponents/charts/weightHorizontalBarChart";
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
  let dinosaursToCharts = [];
  const { data, error, loading } = useQuery(getData);

  let weightHorizontalBarChartData = [];

  if (data) {
    // console.log("api data : ", data);
    // dinosaursToCharts=data.dinosaurs
    dinosaursList = data.dinosaurs;

    console.log("selected: ", selectedDinosaurs);
    // if(selectedDinosaurs)
    //   dinosaursToCharts=data.dinosaurs

    let color = 1;

    for (const dino of data.dinosaurs) {
      if (color === 6) {
        color = 1;
      }
      let tempDinoObjWeight = {
        name: dino.name,
        weight: dino.weight,
        fill: `hsl(var(--chart-${color} ))`,
      };
      color++;
      weightHorizontalBarChartData.push(tempDinoObjWeight);
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
              // defaultValue={selectedDinosaurs}
              placeholder="Select Dinosaurs"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <WeightHorizontalBarChart data={weightHorizontalBarChartData} />
            <WeightHorizontalBarChart data={weightHorizontalBarChartData} />
            <WeightHorizontalBarChart data={weightHorizontalBarChartData} />
            <WeightHorizontalBarChart data={weightHorizontalBarChartData} />
          </div>
        </div>
      )}
    </div>
  );
}
