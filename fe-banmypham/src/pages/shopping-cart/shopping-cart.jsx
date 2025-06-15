import React, { useEffect, useState } from "react";
import Header from "../../components/pages/header.jsx";
// import { useTranslation } from "react-i18next";
import axios from "axios";
import Footer from "../../components/pages/footer.jsx";

const ShoppingCart = () => {
    // const { t } = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to view your cart.");
            setLoading(false);
            return;
        }

        axios.get("http://localhost:8080/api/cart", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setCartItems(res.data); // assuming response is an array of cart items
            })
            .catch((err) => {
                setError("Failed to load cart.");
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const calculateTotal = (item) => (item.quantity * item.price).toFixed(2);
    const calculateSubtotal = () =>
        cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Header />
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Products</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className="shoping__cart__item">
                                                <img src={item.imageUrl} alt="" />
                                                <h5>{item.productName}</h5>
                                            </td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>
                                                <div className="quantity">
                                                    <div className="pro-qty">
                                                        <input type="text" value={item.quantity} readOnly />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>${calculateTotal(item)}</td>
                                            <td><span className="icon_close"></span></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-6 offset-lg-6">
                            <div className="shoping__checkout">
                                <h5>Cart Total</h5>
                                <ul>
                                    <li>Subtotal <span>${calculateSubtotal()}</span></li>
                                    <li>Total <span>${calculateSubtotal()}</span></li>
                                </ul>
                                <a href="/checkout" className="primary-btn">PROCEED TO CHECKOUT</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ShoppingCart;
