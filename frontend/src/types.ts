export interface PriceObservation {
  supermarket: string;
  date: Date;
  price: number;
}

export type PriceHistory = PriceObservation[];

export interface Product {
  ean: number;
  name: string;
  brand: string;
  quantity: number;
  unit: string;
  priceHistory: PriceHistory;
}

export interface ProductWithPriceChange {
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
