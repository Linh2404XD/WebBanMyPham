import React, { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
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

        axios.get("http://localhost:8080/api/cart-items/my-cart", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setCartItems(res.data))
            .catch((err) => {
                setError("Failed to load cart.");
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

        // Cập nhật UI ngay
        const updatedItems = cartItems.map((item) =>
            item.id === cartItemId
                ? { ...item, quantity }
                : item
        );
        setCartItems(updatedItems);

        // Gửi yêu cầu cập nhật đến server
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
                alert("Failed to update quantity.");
            });
    };  

    const handleUpdateCart = async () => {
        const token = localStorage.getItem("token");
        try {
            for (const item of cartItems) {
                await axios.put(
                    `http://localhost:8080/api/cart-items/${item.id}`,
                    { quantity: item.quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            alert("Cart updated successfully.");
        } catch (err) {
            console.error("Failed to update cart:", err);
            alert("Update failed.");
        }
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

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

    return (
        <>
            <Header />
            <section className="shoping-cart spad">
                <div className="container">
                    {cartItems.length === 0 ? (
                        <h3 className="text-center mt-5">Your cart is empty.</h3>
                    ) : (
                        <>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="shoping__cart__table">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th className="shoping__product">Products</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
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

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="shoping__cart__btns d-flex justify-content-between">
                                        <Link to="/" className="primary-btn cart-btn">CONTINUE SHOPPING</Link>
                                        <button className="primary-btn cart-btn cart-btn-right" onClick={handleUpdateCart}>
                                            <span className="icon_loading"></span> Update Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="shoping__checkout mt-5">
                                        <h5>Cart Total</h5>
                                        <ul>
                                            <li>Subtotal <span>{formatCurrency(calculateSubtotal())}</span></li>
                                            <li>Total <span>{formatCurrency(calculateSubtotal())}</span></li>
                                        </ul>
                                        <Link to="/checkout" className="primary-btn">PROCEED TO CHECKOUT</Link>
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
