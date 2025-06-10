import TimelineIcon from "@mui/icons-material/Timeline";
import { add, differenceInCalendarDays, format } from "date-fns";
import { JSX, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

import type { DataForChart, PriceHistory } from "../types";

function toDate(dateArr: number[]): Date {
  return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
}

/**
 * Chart component that displays the price history of a product over time.
 * It uses Recharts to create a line chart with data points for each supermarket.
 *
 * @param data - The price history data to display, which includes dates, prices, and supermarkets.
 */
function Chart({ data }: Readonly<{ data: PriceHistory }>): JSX.Element {
  const supermarkets: string[] = Array.from(
    new Set<string>(data.map((d) => String(d.supermarket.name))),
  );
  const colors = ["#8ec0e1", "#f3b2b0", "#9aeacd", "#fddea0"];
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
  );
  // Start date for the chart is one year ago or the earliest date in the data, whichever is later
  const startDate = new Date(
    Math.max(
      oneYearAgo.getTime(),
      Math.min(...data.map((d) => toDate(d.date).getTime())),
    ),
  );
  const domain = [startDate, now];
  const [fixedPayload, setFixedPayload] = useState<any[] | null>(null);
  const [fixedLabel, setFixedLabel] = useState<number | null>(null);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>
        <TimelineIcon className="me-2" />
        Historique des prix
      </h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
          onClick={(e): void => {
            if (e && e.activePayload && e.activeLabel) {
              setFixedPayload(e.activePayload);
              setFixedLabel(Number(e.activeLabel));
            } else {
              setFixedPayload(null);
              setFixedLabel(null);
            }
          }}
        >
          <XAxis
            dataKey="date"
            scale="time"
            tickFormatter={dateFormatter}
            type="number"
            domain={domain.map((date) => date.getTime())}
            ticks={getTicks(startDate, now, 12)}
          />
          <YAxis
            domain={[0, (dataMax: number): number => Math.ceil(dataMax + 1)]}
          />
          <CartesianGrid stroke="#ccc" />
          <Tooltip
            content={(props: any): JSX.Element => (
              <CustomTooltip
                {...props}
                fixedPayload={fixedPayload}
                fixedLabel={fixedLabel}
                active={!!fixedPayload}
              />
            )}
          />
          <Legend />
          {supermarkets.map((supermarket, i) => (
            <Line
              key={supermarket}
              dataKey="price"
              data={DataPerSupermarket({ data, supermarket })}
              name={supermarket}
              stroke={colors[i % colors.length]}
              dot={true}
              isAnimationActive={false}
              connectNulls
              xAxisId={0}
              yAxisId={0}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * Formats a date to "dd/MMM" format.
 *
 * @param date - The date to format, represented as a timestamp.
 */
const dateFormatter = (date: number): string => {
  return format(new Date(date), "dd/MMM");
};

/**
 * Generates an array of timestamps for the x-axis ticks.
 *
 * @param startDate - The start date of the chart.
 * @param endDate - The end date of the chart.
 * @param num - The number of ticks to generate.
 * @returns An array of timestamps for the x-axis ticks.
 */
const getTicks = (startDate: Date, endDate: Date, num: number): number[] => {
  const diffDays = differenceInCalendarDays(endDate, startDate);
  const current = startDate,
    velocity = Math.round(diffDays / (num - 1));
  const ticks = [startDate.getTime()];
  for (let i = 1; i < num - 1; i++) {
    ticks.push(add(current, { days: i * velocity }).getTime());
  }
  ticks.push(endDate.getTime());
  return ticks;
};

/**
 * Filters the data for a specific supermarket and ensures the last entry is today's date if it isn't already.
 *
 * @param data - The price history data to filter.
 * @param supermarket - The name of the supermarket to filter the data for.
 */
function DataPerSupermarket({
  data,
  supermarket,
}: {
  data: Readonly<PriceHistory>;
  supermarket: string;
}): DataForChart[] {
  const sorted = data
    .filter((d) => d.supermarket.name === supermarket)
    .sort((a, b) => toDate(a.date).getTime() - toDate(b.date).getTime());
  if (sorted.length === 0) {
    return [];
  }
  const last = sorted[sorted.length - 1];
  const today = new Date();
  const lastDate = toDate(last.date);
  const chartData: DataForChart[] = sorted.map((d) => ({
    supermarket: String(d.supermarket.name),
    date: toDate(d.date),
    price: d.price,
  }));
  if (
    lastDate.getFullYear() !== today.getFullYear() ||
    lastDate.getMonth() !== today.getMonth() ||
    lastDate.getDate() !== today.getDate()
  ) {
    return [
      ...chartData,
      {
        supermarket: String(last.supermarket.name),
        price: last.price,
        date: toDate([
          today.getFullYear(),
          today.getMonth() + 1,
          today.getDate(),
        ]),
      },
    ];
  }
  return chartData;
}

type CustomTooltipProps = TooltipProps<number, string> & {
  fixedPayload?: any[] | null;
  fixedLabel?: number | null;
};

function CustomTooltip({
  active,
  payload,
  label,
  fixedPayload,
  fixedLabel,
}: CustomTooltipProps): JSX.Element | null {
  if (!active) {
    return null;
  }
  const showPayload = fixedPayload ?? payload;
  const showLabel: number | string | undefined =
    fixedLabel !== undefined && fixedLabel !== null
      ? fixedLabel
      : typeof label === "number" || typeof label === "string"
        ? label
        : undefined;
  if (!Array.isArray(showPayload) || showPayload.length === 0) {
    return null;
  }
  return (
    <div className={"bg-light p-3 rounded-3 shadow-sm"}>
      <strong>
        {showLabel && new Date(Number(showLabel)).toLocaleDateString()}
      </strong>
      {showPayload.map((entry, i) => (
        <div key={i}>
          {(entry as { value: number; name: string }).name} :{" "}
          {(entry as { value: number; name: string }).value} CHF
        </div>
      ))}
    </div>
  );
}

export default Chart;
