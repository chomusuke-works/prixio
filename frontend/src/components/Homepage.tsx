import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SearchIcon from "@mui/icons-material/Search";
import { JSX, useState, useEffect } from "react";

import { ProductWithPriceChange } from "../types";

type HomepageProps = Readonly<{
  cheaperProducts: ProductWithPriceChange[];
  pricierProducts: ProductWithPriceChange[];
  onSelectProduct: (ean: number) => void;
}>;

function Homepage({
  cheaperProducts,
  pricierProducts,
  onSelectProduct,
}: HomepageProps): JSX.Element {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ProductWithPriceChange[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.trim().length < 2) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(() => {
      setLoading(true);
      fetch(`/product/${encodeURIComponent(search)}/with_price_history`)
        .then((res) => res.json())
        .then((data: ProductWithPriceChange[]) => setResults(data.slice(0, 10))) // Number of results limited to 10
        .finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="min-vh-80 bg-secondary">
      {/* Search */}
      <section className="py-3 bg-secondary">
        <div className="container position-relative">
          <form
            className="input-group mx-auto w-50"
            onSubmit={(e): void => {
              e.preventDefault();
              onSelectProduct(Number(search.trim()));
            }}
            autoComplete="off"
          >
            <input
              type="text"
              className="form-control text-dark rounded-start-pill"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e): void => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary text-dark rounded-end-pill bg-primary fw-bold border-0"
              type="submit"
            >
              <SearchIcon className="me-1" />
              Rechercher
            </button>
          </form>
          {search.trim().length > 1 && (
            <div
              className="position-absolute bg-white shadow rounded w-50"
              style={{ zIndex: 10, left: "50%", transform: "translateX(-50%)" }}
            >
              {loading ? (
                <div className="p-2 text-center">Recherche...</div>
              ) : results.length === 0 ? (
                <div className="p-2 text-center text-muted">Aucun résultat</div>
              ) : (
                <ul className="list-group list-group-flush">
                  {results.map((productWithPriceChange) => (
                    <li
                      key={productWithPriceChange.product.ean}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                      tabIndex={0}
                      role="button"
                      onClick={(): void => onSelectProduct(productWithPriceChange.product.ean)}
                      onKeyDown={(e): void => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectProduct(productWithPriceChange.product.ean);
                        }
                      }}
                    >
                      <span className="fw-bold">{productWithPriceChange.product.name}</span>{" "}
                      <span className="text-muted">{productWithPriceChange.product.brand}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
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
            cheaperProducts.map((productWithPriceChange) => (
              <div className="col" key={productWithPriceChange.product.ean}>
                <ProductCard
                  {...productWithPriceChange}
                  cheaper={true}
                  onClick={(): void => onSelectProduct(productWithPriceChange.product.ean)}
                />
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
            pricierProducts.map((productWithPriceChange) => (
              <div className="col" key={productWithPriceChange.product.ean}>
                <ProductCard
                  {...productWithPriceChange}
                  cheaper={false}
                  onClick={(): void => onSelectProduct(productWithPriceChange.product.ean)}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

type ProductCardProps = Readonly<ProductWithPriceChange> & {
  cheaper: boolean;
  onClick: () => void;
};

/**
 * ProductCard component that displays a single product with its price change information.
 *
 * @param onClick - Callback function to handle click events on the product card.
 * @param product - The product data to display, including its name, brand, quantity, unit, and price change details.
 */
function ProductCard({ onClick, ...productInfo }: ProductCardProps): JSX.Element {
  return (
    <div
      className="product-card card mb-3 shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="card-body">
        <h5 className="card-title mb-1 text-dark">{productInfo.product.name}</h5>
        <h6 className="card-subtitle mb-2 text-dark">{productInfo.product.brand}</h6>
        <p className="mb-2 text-dark">
          <span className="fw-semibold">Quantité :</span> {productInfo.product.quantity}{" "}
          {productInfo.product.unit}
        </p>
        <div className="d-flex align-items-center mb-2">
          <span className="text-muted me-2 text-decoration-line-through">
            {productInfo.priceChange.oldPrice.toFixed(2)}&nbsp;CHF
          </span>
          <span
            className={`fw-bold fs-5 me-2 ${productInfo.cheaper ? "text-success" : "text-danger"}`}
          >
            {productInfo.priceChange.newPrice.toFixed(2)}&nbsp;CHF
          </span>
          <span
            className={`d-flex align-items-center ${productInfo.cheaper ? "text-success" : "text-danger"}`}
          >
            {productInfo.cheaper ? (
              <ArrowDownwardIcon fontSize="small" className="text-success" />
            ) : (
              <ArrowUpwardIcon fontSize="small" className="text-danger" />
            )}
            <span className="ms-1">
              {productInfo.priceChange.priceChange.toFixed(1)}&nbsp;%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
