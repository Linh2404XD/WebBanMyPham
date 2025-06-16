import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/login/login.jsx';
import Checkout from './pages/checkout/checkout.jsx';
import ShopGrid from "./pages/shop-grid/shop-grid.jsx";
import ShoppingCart from "./pages/shopping-cart/shopping-cart.jsx";
import Contact from './pages/contact/contact.jsx';
import Intro from './pages/detail/intro.jsx';
import ProductDetail from "./pages/product/product-detail.jsx";

import {AuthProvider} from "./components/authSession/AuthContext.jsx";
import SessionExpiredAlert from "./components/authSession/SessionExpiredAlert.jsx";
import ManageAccount from "./pages/admin/manageAccount/ManageAccount.jsx";
import ManageOrder from "./pages/admin/manageOrder/ManageOrder.jsx";
import ManageProduct from "./pages/admin/manageProduct/ManageProduct.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import EditAccount from "./pages/admin/manageAccount/EditAccount.jsx";
import Profile from "./pages/user/profile.jsx";
import AddOrder from "./pages/admin/manageOrder/AddOrder.jsx";
import EditOrder from "./pages/admin/manageOrder/EditOrder.jsx";
import VerificationForm from "./pages/verify/verificationForm.jsx";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/index" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/shop-grid" element={<ShopGrid/>}/>
            <Route path="/cart" element={<ShoppingCart/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/intro" element={<Intro/>}/>
            <Route path="/product-detail/:id" element={<ProductDetail/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/manage-account" element={<ManageAccount />}>
                <Route path="edit-account/:id" element={<EditAccount />} />
            </Route>
            <Route path="/manage-order" element={<ManageOrder/>}/>
            <Route path="/manage-product" element={<ManageProduct/>}/>
            <Route path="/edit-account" element={<ManageProduct/>}/>
            <Route path="/manage-order" element={<ManageOrder/>}>
                <Route path="edit-order/:id" element={<EditOrder />} />
                <Route path="add-order" element={<AddOrder />} />
            </Route>
            <Route path="/verify-form" element={<VerificationForm />} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <SessionExpiredAlert/> {/* luôn hiển thị, theo dõi phiên */}
                <AppRoutes/>
            </Router>
        </AuthProvider>
    );
}

export default App;
