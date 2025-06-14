// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/login/login.jsx';
import Checkout from './pages/checkout/checkout.jsx'
import ShopGrid from "./pages/shop-grid/shop-grid.jsx";
import ShoppingCart from "./pages/shopping-cart/shopping-cart.jsx";
import Contact from './pages/contact/contact.jsx'
import Intro from './pages/detail/intro.jsx'
import ProductDetail from "./pages/product/product-detail.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ManageAccount from "./pages/admin/manageAccount/ManageAccount.jsx";
import ManageOrder from "./pages/admin/manageOrder/ManageOrder.jsx";
import ManageProduct from "./pages/admin/manageProduct/ManageProduct.jsx";



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
                <Route path="/contact" element={<Contact />} />
                <Route path="/intro" element={<Intro />} />
                <Route path="/product-detail/:id" element={<ProductDetail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/manage-account" element={<ManageAccount />} />
                <Route path="/manage-order" element={<ManageOrder />} />
                <Route path="/manage-product" element={<ManageProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
