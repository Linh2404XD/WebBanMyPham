import React, {useEffect, useState} from "react";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

const Checkout = () => {
    const {t} = useTranslation();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [orderNotes, setOrderNotes] = useState("");

    const [user, setUser] = useState({
        fullName: "",
        address: "",
        phoneNumber: "",
        email: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to view your cart.");
            setLoading(false);
            return;
        }

        axios.get("http://localhost:8080/api/users/profile", {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((res) => {
                setUser({
                    fullName: res.data.fullName || "",
                    address: res.data.address || "",
                    phoneNumber: res.data.phoneNumber || "",
                    email: res.data.email || ""
                });
            })
            .catch((err) => {
                console.error("Failed to load user info", err);
            });

        axios.get("http://localhost:8080/api/cart-items/my-cart", {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then((res) => setCartItems(res.data))
            .catch((err) => {
                setError("Failed to load cart.");
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    const formatCurrency = (amount) => {
        return amount?.toLocaleString('vi-VN') + ' đ';
    };

    const calculateSubtotal = () =>
        cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập để đặt hàng.");
            return;
        }

        // Tạo orderDetails từ cartItems
        const orderDetails = cartItems.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            unitPrice: item.product.price
        }));

        if (!paymentMethod) {
            alert("Vui lòng chọn phương thức thanh toán.");
            return;
        }

        const orderData = {
            userEmail: user.email,
            paymentMethod: "COD",
            totalAmount: calculateSubtotal(),
            status: "PENDING",
            notes: orderNotes,
            orderDetails: orderDetails
        };

        try {
            await axios.post("http://localhost:8080/api/user/orders/add", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            setCartItems([]);
            alert("Đặt hàng thành công!");
            navigate("/cart");
        } catch (err) {
            console.error("Lỗi khi đặt hàng:", err);
            alert("Đặt hàng thất bại.");
        }
    };


    return (
        <>
            <section className="checkout spad" style={{
                backgroundColor: "#f6f6f6",
                paddingTop: "30px",
                paddingBottom: "0px",
                minHeight: "100vh",
            }}>
                <div className="container">
                    <div className="checkout__form">
                        <h4 className="mb-4">{t("checkOut.billing_details")}</h4>
                        <form action="#">
                            <div className="row">
                                <div className="col-xl-5 col-lg-6 mb-4">
                                    <div className="checkout__input mb-3">
                                        <p>{t("checkOut.fullName")}<span>*</span></p>
                                        <input type="text"
                                               className="checkout__input__add"
                                               value={user.fullName}
                                               onChange={(e) => setUser({...user, fullName: e.target.value})}/>
                                    </div>
                                    <div className="checkout__input mb-3">
                                        <p>{t("checkOut.address")}<span>*</span></p>
                                        <input type="text"
                                               className="checkout__input__add"
                                               value={user.address}
                                               onChange={(e) => setUser({...user, address: e.target.value})}/>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{t("checkOut.phone")}<span>*</span></p>
                                                <input type="text"
                                                       value={user.phoneNumber}
                                                       onChange={(e) => setUser({...user, phoneNumber: e.target.value})}/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>{t("checkOut.email")}<span>*</span></p>
                                                <input type="text"
                                                       value={user.email}
                                                       readOnly/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__input">
                                        <p>{t("checkOut.order_notes")}</p>
                                        <input
                                            type="text"
                                            placeholder={t()}
                                            value={orderNotes}
                                            onChange={(e) => setOrderNotes(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-7 col-lg-6 mb-4">
                                    <div
                                        className="checkout__order p-4"
                                        style={{
                                            backgroundColor: "#f9f9f9",
                                            border: "1px solid #ddd",
                                            borderRadius: "8px",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                        }}
                                    >
                                        <h4 className="mb-3">{t("checkOut.your_order")}</h4>
                                        <div
                                            className="checkout__order__products mb-2 d-flex justify-content-between fw-bold">
                                            <span>{t("checkOut.products")}</span>
                                            <span>{t("checkOut.total")}</span>
                                        </div>
                                        <ul style={{maxHeight: "350px", overflowY: "auto", paddingLeft: "0"}}>
                                            {cartItems.map((item) => (
                                                <li key={item.id} className="d-flex justify-content-between mb-2">
                                                    <span>{item.product.name} x {item.quantity}</span>
                                                    <span>{formatCurrency(item.quantity * item.product.price)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <hr/>
                                        <div className="checkout__order__subtotal d-flex justify-content-between">
                                            <span>{t("checkOut.subtotal")}</span>
                                            <span>{formatCurrency(calculateSubtotal())}</span>
                                        </div>
                                        <div
                                            className="checkout__order__total d-flex justify-content-between fw-bold my-2">
                                            <span>{t("checkOut.total")}</span>
                                            <span>{formatCurrency(calculateSubtotal())}</span>
                                        </div>
                                        <div className="checkout__input__checkbox my-2">
                                            <input
                                                type="radio"
                                                id="cod"
                                                name="paymentMethod"
                                                value="COD"
                                                checked={paymentMethod === "COD"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <label htmlFor="payment">{t("checkOut.check_payment")}</label>
                                        </div>
                                        <div className="checkout__input__checkbox mb-3">
                                            <input
                                                type="radio"
                                                id="paypal"
                                                name="paymentMethod"
                                                value="PAYPAL"
                                                checked={paymentMethod === "PAYPAL"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                            <label htmlFor="paypal">{t("checkOut.paypal")}</label>
                                        </div>
                                        <button type="submit" className="site-btn w-100" onClick={handlePlaceOrder}>
                                            {t("checkOut.place_order")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Checkout;
