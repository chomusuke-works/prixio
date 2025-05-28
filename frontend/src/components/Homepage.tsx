import {ProductWithPriceChange} from "../types";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Homepage({cheaperProducts, pricierProducts}: Readonly<{
    cheaperProducts: ProductWithPriceChange[],
    pricierProducts: ProductWithPriceChange[]
}>) {
    return (
        <div className="bg-light min-vh-100 py-5">
            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8 text-center">
                        <h1 className="display-3 fw-bold mb-2">Prixio</h1>
                        <p className="lead text-muted">Comparez les prix des produits de supermarché pour économiser
                            !</p>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6 offset-md-3">
                        <form className="input-group">
                            <input type="text" className="form-control" placeholder="Rechercher un produit..."/>
                            <button className="btn btn-primary" type="submit">Rechercher</button>
                        </form>
                    </div>
                </div>

                <h2 className="mb-4">Produits moins chers</h2>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {cheaperProducts.map(product => (
                        <div className="col" key={product.ean}>
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
                <h2 className="mt-5 mb-4">Produits plus chers</h2>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {pricierProducts.map(product => (
                        <div className="col" key={product.ean}>
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProductCard(product: Readonly<ProductWithPriceChange>) {
    return (
        <div className="card mb-3 shadow-sm" style={{maxWidth: 350}}>
            <div className="card-body">
                <h5 className="card-title mb-1">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{product.brand}</h6>
                <p className="mb-2">
                    <span className="fw-semibold">Quantité :</span> {product.quantity} {product.unit}
                </p>
                <div className="d-flex align-items-center mb-2">
                    <span className="text-muted me-2" style={{textDecoration: "line-through"}}>
                        {product.priceChange.oldPrice.toFixed(2)}&nbsp;CHF
                    </span>
                    <span
                        className={`fw-bold fs-5 me-2 ${product.priceChange.percentage < 0 ? "text-success" : "text-danger"}`}>
                        {product.priceChange.newPrice.toFixed(2)}&nbsp;CHF
                    </span>
                    <span
                        className={`d-flex align-items-center ${product.priceChange.percentage < 0 ? "text-success" : "text-danger"}`}>
                        {product.priceChange.percentage < 0 ? (
                            <ArrowDownwardIcon fontSize="small" className="text-success"/>
                        ) : (
                            <ArrowUpwardIcon fontSize="small" className="text-danger"/>
                        )}
                        <span className="ms-1">{product.priceChange.percentage.toFixed(1)}&nbsp;%</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Homepage;