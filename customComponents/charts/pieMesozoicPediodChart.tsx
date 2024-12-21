"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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

const chartConfig = {
  Jurassic: {
    label: "Jurassic",
  },
  Triassic: {
    label: "Triassic",
  },
  Cretaceous: {
    label: "Cretaceous",
  },
} satisfies ChartConfig;

interface PropsObject {
  period: string;
  dinosaurNumber: number;
}
interface Props {
  data: PropsObject[];
}

export function PieMesozoicPeriodChart(props: Props) {
  // console.log("Mesozoic data : ", props);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Mesozoic Periods</CardTitle>
        <CardDescription className="items-center">
          Hover over the Pie Chart
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="period" hideLabel />}
            />
            <Pie data={props.data} dataKey="dinosaurNumber">
              <LabelList
                dataKey="period"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Displaying the period that the selected dinosaurs belong to.
        </div>
      </CardFooter>
    </Card>
  );
}
