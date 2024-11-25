"use client";
import { Component } from "@/customComponents/charts/chart";
import { WeightHorizontalBarChart } from "@/customComponents/charts/weightHorizontalBarChart";

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
    console.log("data : ", data);
    chartData = [
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
    ];
    for (const dino of data.dinosaurs) {
      console.log(dino);
      let tempDinoObj = {
        name: dino.name,
        weight: dino.weight,
        fill: "var(--color-chrome)",
      };

      weightHorizontalBarChartData.push(tempDinoObj);
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
        <div className="grid grid-cols-3 gap-4">
          <Component data={chartData} />
          <WeightHorizontalBarChart data={weightHorizontalBarChartData} />
          <Component data={chartData} />
          <Component data={chartData} />
        </div>
      )}
    </div>
  );
}
