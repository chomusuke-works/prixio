import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {useMemo} from 'react';
import type {PriceHistory, Product} from '../types';

console.log("Product.tsx chargé");

function ProductDisplay(product: Readonly<Product>) {
    return (
        <div>
            <h1>{product.name}</h1>
            <p>Marque : {product.brand}</p>
            <p>EAN : {product.ean}</p>
            <p>Quantité : {product.quantity} {product.unit}</p>
            <Chart data={product.priceHistory}/>
        </div>
    );
}

function Chart({data}: { data: Readonly<PriceHistory> }) {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    // Get unique supermarkets and filter data for the last year
    const supermarkets: string[] = Array.from(new Set(data.map(d => d.supermarket)));
    const filteredData = data.filter(d => {
        const [year, month, day] = d.date;
        return new Date(year, month - 1, day) >= oneYearAgo;
    });

    // For each supermarket, create an array of objects with date and price
    const chartData = useMemo(() => {
        const dates = [...new Set(filteredData.map(d => d.date))].sort((a, b) => {
            return new Date(a[0], a[1] - 1, a[2]).getTime() - new Date(b[0], b[1] - 1, b[2]).getTime();
        });

        return dates.map(date => {
            const entry: Record<string, any> = {date};
            supermarkets.forEach(s => {
                const found = filteredData.find(d => d.date === date && d.supermarket === s);
                entry[s] = found?.price ?? null;
            });
            return entry;
        });
    }, [filteredData, supermarkets]);

    const colors = ['#ff0000', '#0000ff', '#00ff00', '#df00ff', '#ffff00'];

    return (
        <div style={{width: '100%', height: 400}}>
            <h2>Historique des prix</h2>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    {supermarkets.map((s, idx) => (
                        <Line
                            key={s}
                            type="monotone"
                            dataKey={s}
                            stroke={colors[idx % colors.length]}
                            dot={{stroke: 'red', strokeWidth: 2, r: 5}}
                            activeDot={{onClick: () => alert(`Point cliqué sur ${s}`)}}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ProductDisplay;