import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"


import {
  ChartConfig,
  ChartContainer,

} from "@/components/ui/chart"


const chartConfig = {
  number: {
    label: "Dados",
    color: "#ff0011",
  },
} satisfies ChartConfig

interface PerformanceChartProps {
  data: Array<{ event: string, number: number }>
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#444] whitespace-nowrap">Desempenho - Últimos 30 dias</h3>
      </div>

      <div className="w-full" style={{ width: '100%', minHeight: 200, minWidth: 300 }}>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="event"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar dataKey="number" fill="var(--color-primary-300)" radius={8} barSize={48}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};