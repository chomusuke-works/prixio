import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import { JSX } from "react";

import { ProductWithPriceChange } from "../types";

/**
 * Homepage component that displays a list of products with their price changes.
 *
 * @param cheaperProducts – List of products that have become cheaper this week.
 * @param pricierProducts – List of products that have become pricier this week.
 */
function Homepage({
  cheaperProducts,
  pricierProducts,
}: Readonly<{
  cheaperProducts: ProductWithPriceChange[];
  pricierProducts: ProductWithPriceChange[];
}>): JSX.Element {
  return (
    <div className="min-vh-80 bg-secondary">
      {/* Search */}
      <section className="py-3 bg-secondary">
        <div className="container">
          <form className="input-group mx-auto w-50">
            <input
              type="text"
              className="form-control text-dark rounded-start-pill"
              placeholder="Rechercher un produit..."
            />
            <button
              className="btn btn-primary text-dark rounded-end-pill bg-primary fw-bold border-0"
              type="submit"
            >
              <SearchIcon className="me-1" />
              Rechercher
            </button>
          </form>
        </div>
      </section>

      {/* Cheaper products */}
      <section className="container py-5">
        <h2 className="mb-4 d-flex align-items-center text-dark fw-bold text-dark">
          <ArrowDownwardIcon className="text-success me-2" />
          Produits moins chers cette semaine
        </h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cheaperProducts.length === 0 ? (
            <div className="col">
              <div className="alert alert-success text-center text-dark">
                Aucune baisse de prix détectée cette semaine.
              </div>
            </div>
          ) : (
            cheaperProducts.map((product) => (
              <div className="col" key={product.ean}>
                <ProductCard {...product} cheaper={true} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Pricier products */}
      <section className="container pb-1">
        <h2 className="mb-4 d-flex align-items-center text-dark fw-bold text-dark">
          <ArrowUpwardIcon className="text-danger me-2" />
          Produits plus chers cette semaine
        </h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {pricierProducts.length === 0 ? (
            <div className="col">
              <div className="alert alert-danger text-center text-dark">
                Aucune hausse de prix détectée cette semaine.
              </div>
            </div>
          ) : (
            pricierProducts.map((product) => (
              <div className="col" key={product.ean}>
                <ProductCard {...product} cheaper={false} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

/**
 * ProductCard component that displays a single product with its price change information.
 *
 * @param product - The product data to display, including its name, brand, quantity, unit, and price change details.
 */
function ProductCard(
  product: Readonly<ProductWithPriceChange> & { cheaper: boolean },
): JSX.Element {
  return (
    <div className="product-card card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-1 text-dark">{product.name}</h5>
        <h6 className="card-subtitle mb-2 text-dark">{product.brand}</h6>
        <p className="mb-2 text-dark">
          <span className="fw-semibold">Quantité :</span> {product.quantity}{" "}
          {product.unit}
        </p>
        <div className="d-flex align-items-center mb-2">
          <span className="text-muted me-2 text-decoration-line-through">
            {product.priceChange.oldPrice.toFixed(2)}&nbsp;CHF
          </span>
          <span
            className={`fw-bold fs-5 me-2 ${product.cheaper ? "text-success" : "text-danger"}`}
          >
            {product.priceChange.newPrice.toFixed(2)}&nbsp;CHF
          </span>
          <span
            className={`d-flex align-items-center ${product.cheaper ? "text-success" : "text-danger"}`}
          >
            {product.cheaper ? (
              <ArrowDownwardIcon fontSize="small" className="text-success" />
            ) : (
              <ArrowUpwardIcon fontSize="small" className="text-danger" />
            )}
            <span className="ms-1">
              {product.priceChange.percentage.toFixed(1)}&nbsp;%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
