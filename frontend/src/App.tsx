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
            { supermarket: "Supermarket1", date: new Date(2025, 0, 1), price: 8.5 },
            { supermarket: "Supermarket2", date: new Date(2025, 0, 3), price: 15.0 },
            { supermarket: "Supermarket1", date: new Date(2025, 0, 15), price: 18.2 },
            { supermarket: "Supermarket2", date: new Date(2025, 1, 2), price: 10.8 },
            { supermarket: "Supermarket1", date: new Date(2025, 1, 20), price: 22.5 },
            { supermarket: "Supermarket2", date: new Date(2025, 2, 5), price: 19.7 },
            { supermarket: "Supermarket1", date: new Date(2025, 2, 28), price: 12.9 },
            { supermarket: "Supermarket2", date: new Date(2025, 3, 10), price: 24.1 },
            { supermarket: "Supermarket1", date: new Date(2025, 3, 25), price: 25.3 },
            { supermarket: "Supermarket2", date: new Date(2025, 4, 7), price: 13.0 },
            { supermarket: "Supermarket1", date: new Date(2025, 4, 20), price: 16.2 },
            { supermarket: "Supermarket2", date: new Date(2025, 4, 20), price: 21.4 }
        ]
    };

    return (
        <div>
            <ProductDisplay {...defaultProduct} />
        </div>
);
}

export default App;
