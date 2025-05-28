import type {Product} from '../types';
import Chart from './Chart';
import AddObservation from "./AddObservation";


/**
 * Generates the display for a product, including its name, brand, EAN, quantity, unit, and a chart of its price history.
 *
 * @param product - The product data to display, including its name, brand, EAN, quantity, unit, and price history.
 */
function ProductDisplay(product: Readonly<Product>) {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    // Filter data for the last year
    const filteredData = product.priceHistory.filter(d => d.date >= oneYearAgo);
    return (
        <div className="container my-5 p-4 bg-light rounded shadow">
            <div className="row align-items-start mb-4">
                <div className="col-md-8 d-flex align-items-start">
                    <div>
                        <h1 className="display-5 fw-bold mb-2 d-inline-block">{product.name}</h1>
                        <div>
                            <span className="badge bg-primary fs-6 me-2">{product.brand}</span>
                            <span className="badge bg-secondary fs-6">EAN : {product.ean}</span>
                            <p className="mt-3 mb-1">
                                <strong>Quantité :</strong> {product.quantity} {product.unit}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex align-items-start justify-content-end">
                    <AddObservation/>
                </div>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
                <Chart data={filteredData}/>
            </div>
        </div>
    );
}


export default ProductDisplay;