import { JSX, useState, useEffect } from "react";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import ProductDisplay from "./components/Product";
import { Product, ProductWithPriceChange } from "./types";

function App(): JSX.Element {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cheaperProducts, setCheaperProducts] = useState<
    ProductWithPriceChange[]
  >([]);
  const [pricierProducts, setPricierProducts] = useState<
    ProductWithPriceChange[]
  >([]);

  useEffect(() => {
    fetch(`${process.env.API_URL ?? ""}/top/down`)
      .then((res) => res.json())
      .then((data) => setCheaperProducts(data as ProductWithPriceChange[]))
      .catch(() => setCheaperProducts([]));
    fetch(`${process.env.API_URL ?? ""}/top/up`)
      .then((res) => res.json())
      .then((data) => setPricierProducts(data as ProductWithPriceChange[]))
      .catch(() => setCheaperProducts([]));
  }, []);

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
          cheaperProducts={cheaperProducts}
          pricierProducts={pricierProducts}
          onSelectProduct={(ean): void => {
            fetch(`${process.env.API_URL ?? ""}/product/${ean}/with_price_history`)
              .then((res) => res.json())
              .then((fullProduct) => setSelectedProduct(fullProduct as Product))
              .catch(() => setSelectedProduct(null));
          }}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
