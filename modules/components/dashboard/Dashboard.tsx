"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { PaymentWithRelations } from "@/interface/payment";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export interface MonthlyVehicleChartData {
  month: string;
  date: Date;
  [vehicleName: string]: string | number | Date;
}

interface Props {
  Payments: PaymentWithRelations[];
}
export const Dashboard = (props: Props) => {
  const { Payments = [] } = props;

  const [timeRange, setTimeRange] = useState("12");

  const chartData = useMemo(() => {
    const result: Record<string, MonthlyVehicleChartData> = {};

    const vehicleNames = Array.from(
      new Set(Payments.map((p) => p.vehicle.name)),
    );

    Payments.forEach((payment) => {
      const monthKey = format(payment.createdAt, "yyyy-MM");

      const monthLabel = format(payment.createdAt, "MMM yyyy", {
        locale: es,
      });

      const vehicleName = payment.vehicle.name;

      if (!result[monthKey]) {
        result[monthKey] = {
          month: monthLabel,
          date: new Date(format(payment.createdAt, "yyyy-MM-01")),
        };
      }

      if (!result[monthKey][vehicleName]) {
        result[monthKey][vehicleName] = 0;
      }

      result[monthKey][vehicleName] =
        (result[monthKey][vehicleName] as number) + payment.amount;
    });

    Object.values(result).forEach((monthData) => {
      vehicleNames.forEach((vehicle) => {
        if (!(vehicle in monthData)) {
          monthData[vehicle] = 0;
        }
      });
    });

    return Object.entries(result)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, value]) => value);
  }, [Payments]);

  const filteredData = useMemo(() => {
    const now = new Date();

    let monthsBack = 0;

    switch (timeRange) {
      case "3":
        monthsBack = 2;
        break;
      case "6":
        monthsBack = 5;
        break;
      case "12":
        monthsBack = 11;
        break;
    }

    const currentMonthIndex = now.getUTCFullYear() * 12 + now.getUTCMonth();

    const startMonthIndex = currentMonthIndex - monthsBack;

    return chartData.filter((item) => {
      const date = new Date(item.date);

      const itemMonthIndex = date.getUTCFullYear() * 12 + date.getUTCMonth();

      return (
        itemMonthIndex >= startMonthIndex && itemMonthIndex <= currentMonthIndex
      );
    });
  }, [chartData, timeRange]);

  const vehicleNames = useMemo(() => {
    return Array.from(new Set(Payments.map((p) => p.vehicle.name)));
  }, [Payments]);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};

    vehicleNames.forEach((vehicle, index) => {
      config[vehicle] = {
        label: vehicle,
        color: `var(--chart-${(index % 5) + 1})`,
      };
    });

    return config;
  }, [vehicleNames]);

  return (
    <div className="flex flex-col gap-4 w-2/5 md:w-2/4  h-auto">
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle>Estadisticas de pagos realizados por vehículo</CardTitle>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="hidden w-40 rounded-lg sm:ml-auto sm:flex"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value={"3"} className="rounded-lg">
                Ultimos 3 meses
              </SelectItem>
              <SelectItem value="6" className="rounded-lg">
                Ultimos 6 meses
              </SelectItem>
              <SelectItem value="12" className="rounded-lg">
                Ultimo año
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={filteredData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              {vehicleNames.map((vehicle, index) => (
                <Line
                  key={vehicle}
                  dataKey={vehicle}
                  type="monotone"
                  stroke={`var(--chart-${(index % 5) + 1})`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Verifica tus gastos en combustible
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                Analiza tus patrones de consumo y optimiza tus gastos.
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
