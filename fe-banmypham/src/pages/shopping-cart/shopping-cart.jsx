import React, { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ShoppingCart = () => {
    const { t } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError(t("cart.needLogin"));
            setLoading(false);
            return;
        }

        axios.get("http://localhost:8080/api/cart-items/my-cart", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setCartItems(res.data))
            .catch((err) => {
                setError(t("cart.loadFail"));
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = (cartItemId) => {
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:8080/api/cart-items/${cartItemId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(() => {
                setCartItems(prev => prev.filter(item => item.id !== cartItemId));
            })
            .catch(err => console.error("Failed to delete item", err));
    };

    const handleQuantityChange = (cartItemId, newQuantity) => {
        const quantity = parseInt(newQuantity) || 1;

        const updatedItems = cartItems.map((item) =>
            item.id === cartItemId
                ? { ...item, quantity }
                : item
        );
        setCartItems(updatedItems);

        const token = localStorage.getItem("token");
        axios.put(`http://localhost:8080/api/cart-items/${cartItemId}`,
            { quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(() => {
                console.log(`Quantity for item ${cartItemId} updated to ${quantity}`);
            })
            .catch((err) => {
                console.error("Failed to update quantity", err);
                alert(t("cart.updateQuantityFail"));
            });
    };

    const calculateTotal = (item) => item.quantity * item.product.price;

    const calculateSubtotal = () =>
        cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    if (loading) return <p className="text-center mt-5">{t("cart.loading")}</p>;
    if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

    return (
        <>
            <Header />
            <section className="shoping-cart spad">
                <div className="container">
                    {cartItems.length === 0 ? (
                        <h3 className="text-center mt-5">{t("cart.empty")}</h3>
                    ) : (
                        <>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="shoping__cart__table">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th className="shoping__product">{t("cart.products")}</th>
                                                <th>{t("cart.price")}</th>
                                                <th>{t("cart.quantity")}</th>
                                                <th>{t("cart.total")}</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {cartItems.map(item => (
                                                <tr key={item.id}>
                                                    <td className="shoping__cart__item">
                                                        <img
                                                            src={item.product.imageUrl}
                                                            alt={item.product.name}
                                                            style={{ width: "80px", height: "80px", objectFit: "cover", marginRight: "15px" }}
                                                        />
                                                        <h5>{item.product.name}</h5>
                                                    </td>
                                                    <td className="shoping__cart__price">{formatCurrency(item.product.price)}</td>
                                                    <td>
                                                        <div className="quantity">
                                                            <input
                                                                type="number"
                                                                value={item.quantity}
                                                                min="1"
                                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="shoping__cart__total">{formatCurrency(calculateTotal(item))}</td>
                                                    <td>
                                                        <span
                                                            className="icon_close"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleDelete(item.id)}
                                                        ></span>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4 align-items-start justify-content-between">
                                <div className="col-lg-6 d-flex align-items-center">
                                    <Link to="/" className="primary-btn cart-btn">{t("cart.continueShopping")}</Link>
                                </div>

                                <div className="col-lg-6">
                                    <div className="shoping__checkout">
                                        <h5>{t("cart.cartTotal")}</h5>
                                        <ul>
                                            <li>{t("cart.subtotal")} <span>{formatCurrency(calculateSubtotal())}</span></li>
                                            <li>{t("cart.totalLabel")} <span>{formatCurrency(calculateSubtotal())}</span></li>
                                        </ul>
                                        <Link to="/checkout" className="primary-btn">{t("cart.checkout")}</Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ShoppingCart;
