import type {PriceHistory} from "../types";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import { add, format, differenceInCalendarDays} from "date-fns";

/**
 * Chart component that displays the price history of a product over time.
 * It uses Recharts to create a line chart with data points for each supermarket.
 *
 * @param data - The price history data to display, which includes dates, prices, and supermarkets.
 */
function Chart({data}: Readonly<{ data: PriceHistory }>) {
    const supermarkets: string[] = Array.from(new Set(data.map(d => d.supermarket)));
    const colors = ['#8ec0e1', '#f3b2b0', '#9aeacd', '#fddea0'];
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    // Start date for the chart is one year ago or the earliest date in the data, whichever is later
    const startDate = new Date(Math.max(oneYearAgo.getTime(), Math.min(...data.map(d => d.date.getTime()))));
    const domain = [startDate, now];

    return (
        <div style={{width: '100%', height: 400}}>
            <h2>Historique des prix</h2>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis dataKey="date"
                           scale="time"
                           tickFormatter={dateFormatter}
                           type="number"
                           domain={domain.map(date => date.getTime())}
                           ticks={getTicks(startDate, now, 12)}/>
                    <YAxis/>
                    <CartesianGrid stroke="#ccc"/>
                    <Tooltip/>
                    <Legend/>
                    {supermarkets.map((supermarket, i) => (
                        <Line
                            key={supermarket}
                            dataKey="price"
                            data={DataPerSupermarket({data, supermarket})}
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
const dateFormatter = (date: number) => {
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
const getTicks = (startDate: Date, endDate: Date, num: number) => {
    const diffDays = differenceInCalendarDays(endDate, startDate);
    let current = startDate, velocity = Math.round(diffDays / (num - 1));
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
function DataPerSupermarket({data, supermarket}: { data: Readonly<PriceHistory>, supermarket: string }) {
    const sorted = data
        .filter(d => d.supermarket === supermarket)
        .sort((a, b) => a.date.getTime() - b.date.getTime());
    if (sorted.length === 0) return [];
    const last = sorted[sorted.length - 1];
    const today = new Date();
    if (
        last.date.getFullYear() !== today.getFullYear() ||
        last.date.getMonth() !== today.getMonth() ||
        last.date.getDate() !== today.getDate()
    ) {
        return [...sorted, { ...last, date: today }];
    }
    return sorted;
}

export default Chart;