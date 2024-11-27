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
  [key: string]: any;
}
// const chartConfig = {
//   weight: {
//     label: "weight",
//     color: "hsl(var(--chart-2))",
//   },
//   dinosaur: {
//     label: "Australotitan",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

export function WeightHorizontalBarChart(props: Props) {
  console.log("weight data : ", props);
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
              left: 25,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={0}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="weight" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="weight" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing weight in Kilogramms.
        </div>
      </CardFooter>
    </Card>
  );
}
