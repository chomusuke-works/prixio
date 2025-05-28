import type {Product} from '../types';
import Chart from './Chart';
import AddObservation from "./AddObservation";

function ProductDisplay(product: Readonly<Product>) {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    const filteredData = product.priceHistory.filter(d => d.date >= oneYearAgo);

    return (
        <div className="min-vh-80 bg-secondary py-5">
            <section className="container">
                <div className="d-flex flex-column flex-md-row align-items-start justify-content-between mb-4">
                    <div>
                        <h1 className="display-4 fw-bold text-dark mb-2">{product.name}</h1>
                        <span className="badge bg-primary fs-5 mb-3">{product.brand}</span>
                        <p className="mb-2 text-dark">
                            <strong>Quantité :</strong> {product.quantity} {product.unit}
                        </p>
                    </div>
                    <div className="mt-3 mt-md-0">
                        <AddObservation/>
                    </div>
                </div>
                <div className="bg-light rounded-4 shadow-sm p-4">
                    <Chart data={filteredData}/>
                </div>
            </section>
        </div>
    );
}

export default ProductDisplay;