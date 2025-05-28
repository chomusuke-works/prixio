export type PriceObservation = {
    supermarket: string;
    date: Date;
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

export type ProductWithPriceChange = {
    ean: number;
    name: string;
    brand: string;
    quantity: number;
    unit: string;
    priceChange: {
        oldPrice: number;
        newPrice: number;
        percentage: number;
    };
}