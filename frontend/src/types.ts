export interface PriceObservation {
  supermarket: string;
  ean: string;
  date: Date;
  price: number;
}

export type PriceHistory = PriceObservation[];

export interface Product {
  ean: string;
  name: string;
  brand: string;
  quantity: number;
  unit: string;
}

export interface ProductWithPriceHistory {
  product: Product;
  priceHistory: PriceHistory;
}

export interface PriceChange {
  oldPrice: number;
  newPrice: number;
  priceChange: number;
}

export interface ProductWithPriceChange {
  product: Product;
  priceChange: PriceChange;
}
