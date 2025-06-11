import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {JSX, useState, ChangeEvent} from "react";

import {Product, ProductWithPriceChange} from "../types";

import AddProduct from "./AddProduct";

type HomepageProps = Readonly<{
  cheaperProducts: ProductWithPriceChange[];
  pricierProducts: ProductWithPriceChange[];
  onSelectProduct: (ean: string) => void;
}>;

const MIN_SEARCH_STRING_LENGTH = 2;

export function Homepage({
  cheaperProducts,
  pricierProducts,
  onSelectProduct,
}: HomepageProps): JSX.Element {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    if (search.trim().length <= MIN_SEARCH_STRING_LENGTH) {
      setResults([]);
      return;
    }

    setLoading(true);
    fetch(
        `${process.env.REACT_APP_API_URL ?? ""}/search/${encodeURIComponent(search)}`,
    )
        .then(async (res) => {
          const text = await res.text();
          return text ? (JSON.parse(text) as Product[]) : [];
        })
        .then((data: Product[]) => setResults(data.slice(0, 10)))
        .finally(() => setLoading(false));
  }

  return (
    <div className="min-vh-80 bg-secondary">
      {/* Search */}
      <section className="py-3 bg-secondary">
        <div className="container position-relative">
          <form
            className="input-group mx-auto w-50 d-flex align-items-center"
            onSubmit={(e): void => {
              e.preventDefault();
              onSelectProduct(search.trim());
            }}
            autoComplete="off"
          >
            <input
              type="text"
              className="form-control text-dark rounded-start-pill rounded-end-pill"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={onSearchChange}
            />
            {search.trim().length > MIN_SEARCH_STRING_LENGTH && !loading && results.length === 0 && (<AddProduct name={search.trim()}/>)}
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
                  {results.map((product: Product) => (
                    <li
                      key={product.ean}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                      tabIndex={0}
                      role="button"
                      onClick={(): void =>
                        onSelectProduct(product.ean)
                      }
                      onKeyDown={(e): void => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelectProduct(product.ean);
                        }
                      }}
                    >
                      <span className="fw-bold">
                        {product.name}
                      </span>{" "}
                      <span className="text-muted">
                        {product.brand}
                      </span>
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
                  onClick={(): void =>
                    onSelectProduct(productWithPriceChange.product.ean)
                  }
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
                  onClick={(): void =>
                    onSelectProduct(productWithPriceChange.product.ean)
                  }
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
function ProductCard({
  onClick,
  ...productInfo
}: ProductCardProps): JSX.Element {
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
        <h5 className="card-title mb-1 text-dark">
          {productInfo.product.name}
        </h5>
        <h6 className="card-subtitle mb-2 text-dark">
          {productInfo.product.brand}
        </h6>
        <p className="mb-2 text-dark">
          <span className="fw-semibold">Quantité :</span>{" "}
          {productInfo.product.quantity} {productInfo.product.unit}
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
              {(
                ((productInfo.priceChange.newPrice -
                  productInfo.priceChange.oldPrice) /
                  productInfo.priceChange.oldPrice) *
                100
              ).toFixed(1)}
              &nbsp;%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

