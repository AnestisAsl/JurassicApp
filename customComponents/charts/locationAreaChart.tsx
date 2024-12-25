"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PropsObject {
  continent: string;
  dinosaurs: number;
}
interface Props {
  data: PropsObject[];
}
const chartConfig = {
  continent: {
    label: "Continent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LocationAreaChart(props: Props) {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Continent Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={props.data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid
              className="fill-[--color-continent] opacity-20"
              gridType="circle"
            />
            <PolarAngleAxis dataKey="continent" />
            <Radar
              dataKey="dinosaurs"
              fill="var(--color-continent)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Displaying the continent of the selected dinosaurs.
        </div>
      </CardFooter>
    </Card>
  );
}
