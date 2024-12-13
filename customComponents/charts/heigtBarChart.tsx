"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

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
  name: string;
  height: number;
  fill: string;
}
interface Props {
  data: PropsObject[];
}
interface CustomConfig {
  [key: string]: any;
}

export function HeightBarChart(props: Props) {
  console.log("height data : ", props);
  for (let dino of props.data) {
    if (dino.name === "Tyrannosaurus Rex") {
      dino.name = "T-Rex";
    }
  }
  let chartConfig: CustomConfig = {};
  for (let el of props.data) {
    let key = el.name;
    chartConfig[key] = {
      label: key,
    };
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Height Bar Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={props.data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="height" strokeWidth={2} radius={8} activeIndex={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing height in meters
        </div>
      </CardFooter>
    </Card>
  );
}
