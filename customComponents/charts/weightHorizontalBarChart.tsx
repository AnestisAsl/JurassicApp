"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Label, XAxis, YAxis } from "recharts";

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
import { Config } from "tailwindcss";

interface PropsObject {
  name: string;
  weight: number;
  fill: string;
}
interface Props {
  data: PropsObject[];
}
interface CustomConfig {
  label: string;
  color: string;
}
const chartConfig = {
  weight: {
    label: "weight",
    color: "hsl(var(--chart-2))",
  },
  dinosaur: {
    label: "Australotitan",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function WeightHorizontalBarChart(props: Props) {
  console.log("weight data : ", props);
  // let chartConfig={}
  // for (let el of props.data) {
  //   let key = el.name;
  //   let chartConfig[key] = {
  //     label: key,
  //     color: "hsl(var(--chart-1))",
  //   };
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={props.data}
            layout="vertical"
            margin={{
              left: 15,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={2}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="weight" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="weight" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
