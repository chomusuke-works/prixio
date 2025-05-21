export type PriceObservation = {
    supermarket: string;
    date: number[];
    price: number;
};

export type PriceHistory = PriceObservation[];

export type Product = {
    ean: number;
    name: string;
    brand: string;
    quantity: number;
    unit: string;
    priceHistory: PriceHistory;
}