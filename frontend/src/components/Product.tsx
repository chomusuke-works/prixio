import { JSX } from "react";

import type { ProductWithPriceHistory } from "../types";

import AddObservation from "./AddObservation";
import Chart from "./Chart";

type ProductDisplayProps = Readonly<ProductWithPriceHistory> & {
  onBack: () => void;
};

function ProductDisplay({
  onBack,
  ...product
}: ProductDisplayProps): JSX.Element {
  return (
    <div className="min-vh-80 bg-secondary py-5">
      <section className="container">
        <button
          className="btn btn-outline-secondary mb-3"
          onClick={onBack}
          type="button"
        >
          ← Retour
        </button>
        <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-4">
          <div>
            <h1 className="display-4 fw-bold text-dark mb-2">
              {product.product.name}
            </h1>
            <span className="badge bg-primary fs-5 mb-3">
              {product.product.brand}
            </span>
            <p className="mb-2 text-dark">
              <strong>Quantité :</strong> {product.product.quantity}{" "}
              {product.product.unit}
            </p>
          </div>
          <div className="mt-3 mt-md-0">
            <AddObservation
              supermarketList={["Migros", "Coop", "Manor"]}
              ean={product.product.ean}
            />
          </div>
        </div>
        <div className="bg-light rounded-4 shadow-sm p-4">
          <Chart data={product.priceHistory} />
        </div>
      </section>
    </div>
  );
}

export default ProductDisplay;
