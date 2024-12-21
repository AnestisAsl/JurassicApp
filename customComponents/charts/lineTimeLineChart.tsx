"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Dot, Line, LineChart } from "recharts";

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
  dinosaurName: string;
  date: number;
  fill: string;
}
interface Props {
  data: PropsObject[];
}
interface CustomConfig {
  [key: string]: any;
}

export function LineTimeLineChart(props: Props) {
  console.log("timeline data : ", props);
  for (let fossil of props.data) {
    if (fossil.dinosaurName === "Tyrannosaurus Rex") {
      fossil.dinosaurName = "T-Rex";
    }
    fossil.dinosaurName = fossil.dinosaurName.concat("\xa0");
  }
  let chartConfig: CustomConfig = {};
  for (let el of props.data) {
    let key = el.dinosaurName;
    chartConfig[key] = {
      label: key,
    };
  }
  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center ">
        <CardTitle>Dates of fossils found</CardTitle>
      </CardHeader>
      <CardContent className="h-full	pt-8 ">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={props.data}
            margin={{
              top: 150,
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  nameKey="dinosaurName"
                  hideLabel
                />
              }
            />
            <Line
              dataKey="date"
              type="natural"
              stroke="hsl(var(--chart-1 ))"
              strokeWidth={2}
              dot={({ payload, ...props }) => {
                return (
                  <Dot
                    key={payload.dinosaurName}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.fill}
                    stroke={payload.fill}
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col  text-sm ">
        <div className="flex gap-2 font-medium leading-none">
          Displaying when the fossils of the selected dinosaurs found.
        </div>
      </CardFooter>
    </Card>
  );
}
