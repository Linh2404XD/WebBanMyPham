import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/login/login.jsx';
import Checkout from './pages/checkout/checkout.jsx';
import ShopGrid from "./pages/shop-grid/shop-grid.jsx";
import ShoppingCart from "./pages/shopping-cart/shopping-cart.jsx";
import Contact from './pages/contact/contact.jsx';
import Intro from './pages/detail/intro.jsx';
import ProductDetail from "./pages/product/product-detail.jsx";

import { AuthProvider } from "./components/authSession/AuthContext.jsx";
import SessionExpiredAlert from "./components/authSession/SessionExpiredAlert.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shop-grid" element={<ShopGrid />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <SessionExpiredAlert /> {/* luôn hiển thị, theo dõi phiên */}
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
