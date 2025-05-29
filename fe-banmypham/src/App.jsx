// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/login/login.jsx';
import Checkout from './pages/checkout/checkout.jsx'
import ShopGrid from "./pages/shop-grid/shop-grid.jsx";
import ShoppingCart from "./pages/shopping-cart/shopping-cart.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/index" element={<Home />} />
                {/* Thêm các route khác ở đây */}
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/shop-grid" element={<ShopGrid />} />
                <Route path="/cart" element={<ShoppingCart />} />
            </Routes>
        </Router>
    );
}

export default App;
