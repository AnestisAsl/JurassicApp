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
  const { data, error, loading } = useQuery(getData);
  var chartData = [{ month: "", desktop: 0, mobile: 0 }];
  let weightHorizontalBarChartData = [];

  if (data) {
    console.log("api data : ", data);
    chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ];
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
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);

  const frameworksList = [
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "ember", label: "Ember" },
  ];

  if (error) return <ErrorPage />;
  return (
    <div>
      {loading ? (
        <Button disabled>
          <Loader2 className="animate-spin" />
          Please wait
        </Button>
      ) : (
        <div className="p-4 max-w-xl">
          <h1 className="text-2xl font-bold mb-4">Multi-Select Component</h1>
          <MultiSelect
            options={frameworksList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={3}
          />
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Selected Frameworks:</h2>
            <ul className="list-disc list-inside">
              {selectedFrameworks.map((framework) => (
                <li key={framework}>{framework}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Component data={chartData} />
            <WeightHorizontalBarChart data={weightHorizontalBarChartData} />
            <Component data={chartData} />
            <Component data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}
