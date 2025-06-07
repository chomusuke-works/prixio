import { JSX, useState } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ProductDisplay from "./components/Product";
import { PriceHistory, Product, ProductWithPriceChange } from "./types";

const defaultPricehistory: PriceHistory = [
  { supermarket: "Migros", date: new Date(2025, 0, 1), price: 8.5 },
  { supermarket: "Coop", date: new Date(2025, 0, 3), price: 15.0 },
  { supermarket: "Migros", date: new Date(2025, 0, 15), price: 18.2 },
  { supermarket: "Coop", date: new Date(2025, 1, 2), price: 10.8 },
  { supermarket: "Migros", date: new Date(2025, 1, 20), price: 22.5 },
  { supermarket: "Coop", date: new Date(2025, 2, 5), price: 19.7 },
  { supermarket: "Migros", date: new Date(2025, 2, 28), price: 12.9 },
  { supermarket: "Coop", date: new Date(2025, 3, 10), price: 24.1 },
  { supermarket: "Migros", date: new Date(2025, 3, 25), price: 25.3 },
  { supermarket: "Coop", date: new Date(2025, 4, 7), price: 13.0 },
  { supermarket: "Migros", date: new Date(2025, 4, 20), price: 16.2 },
  { supermarket: "Coop", date: new Date(2025, 4, 20), price: 21.4 },
];

function App(): JSX.Element {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div>
      <Header />
      {selectedProduct ? (
        <ProductDisplay
          {...selectedProduct}
          onBack={(): void => setSelectedProduct(null)}
        />
      ) : (
        <Homepage
          // TODO : Appel API pour avoir les 3 produits moins chers et 3 plus chers
          cheaperProducts={cheaperProducts}
          pricierProducts={pricierProducts}
          onSelectProduct={(product): void =>
            setSelectedProduct({
              ...product,
              // TODO : Appel API pour avoir le bon price history
              priceHistory: defaultPricehistory
            })
          }
        />
      )}
      <Footer />
    </div>
  );
}

const cheaperProducts: ProductWithPriceChange[] = [
  {
    ean: 1234567890123,
    name: "Pain complet",
    brand: "Marque de Test",
    quantity: 500,
    unit: "Grammes",
    priceChange: {
      oldPrice: 8.5,
      newPrice: 7.5,
      percentage: -11.8,
    },
  },
  {
    ean: 9876543210987,
    name: "Pâtes complètes",
    brand: "Autre Marque",
    quantity: 1000,
    unit: "Grammes",
    priceChange: {
      oldPrice: 2.0,
      newPrice: 1.8,
      percentage: -10.0,
    },
  },
  {
    ean: 1122334455667,
    name: "Riz basmati",
    brand: "Marque Basmati",
    quantity: 1000,
    unit: "Grammes",
    priceChange: {
      oldPrice: 3.5,
      newPrice: 3.2,
      percentage: -8.6,
    },
  },
];
const pricierProducts: ProductWithPriceChange[] = [
  {
    ean: 2233445566778,
    name: "Lait entier",
    brand: "Laiterie Suisse",
    quantity: 1000,
    unit: "Millilitres",
    priceChange: {
      oldPrice: 1.2,
      newPrice: 1.5,
      percentage: 25.0,
    },
  },
  {
    ean: 3344556677889,
    name: "Beurre doux",
    brand: "Beurrier",
    quantity: 250,
    unit: "Grammes",
    priceChange: {
      oldPrice: 2.0,
      newPrice: 2.4,
      percentage: 20.0,
    },
  },
  {
    ean: 4455667788990,
    name: "Jus d'orange",
    brand: "Fruity",
    quantity: 1500,
    unit: "Millilitres",
    priceChange: {
      oldPrice: 3.0,
      newPrice: 3.6,
      percentage: 20.0,
    },
  },
];

export default App;
