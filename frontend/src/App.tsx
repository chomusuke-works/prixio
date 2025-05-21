import ProductDisplay from './components/Product';
import {Product} from './types';

function App() {
    const defaultProduct: Product = {
        ean: 1234567890123,
        name: "Name",
        brand: "Brand",
        quantity: 4,
        unit: "Unit",
        priceHistory: [
            { supermarket: "Supermarket1", date: [2025, 1, 1], price: 10 },
            { supermarket: "Supermarket2", date: [2025, 1, 2], price: 20 },
            { supermarket: "Supermarket1", date: [2025, 1, 3], price: 15 },
            { supermarket: "Supermarket2", date: [2025, 1, 4], price: 25 },
            { supermarket: "Supermarket1", date: [2025, 1, 5], price: 15 },
            { supermarket: "Supermarket2", date: [2025, 1, 6], price: 25 },
            { supermarket: "Supermarket1", date: [2025, 1, 7], price: 10 },
            { supermarket: "Supermarket2", date: [2025, 1, 8], price: 28 },
            { supermarket: "Supermarket1", date: [2025, 1, 9], price: 18 },
            { supermarket: "Supermarket2", date: [2025, 1, 10], price: 21 }
        ]
    };

    return (
        <div>
            <ProductDisplay {...defaultProduct} />
        </div>
);
}

export default App;
