import React, { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import axios from "axios";
import { useTranslation } from "react-i18next";

const MyOrders = () => {
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Bạn cần đăng nhập để xem đơn hàng.");
            setLoading(false);
            return;
        }

        axios.get("http://localhost:8080/api/users/orders", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setOrders(res.data);
            })
            .catch(err => {
                console.error("Lỗi lấy đơn hàng:", err);
                setError("Không thể tải danh sách đơn hàng.");
            })
            .finally(() => setLoading(false));
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND"
        }).format(amount);
    };

    if (loading) return <p className="text-center mt-5">Đang tải đơn hàng...</p>;
    if (error) return <p className="text-center text-danger mt-5">{error}</p>;

    return (
        <>
            <Header />
            <section className="shoping-cart spad">
                <div className="container" style={{width:'1280px'}}>
                    {orders.length === 0 ? (
                        <h3 className="text-center mt-5">Bạn chưa có đơn hàng nào.</h3>
                    ) : (
                        <div className="shoping__cart__table">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Mã đơn</th>
                                    <th>Phương thức</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.paymentMethod}</td>
                                        <td>{formatCurrency(order.totalAmount)}</td>
                                        <td>
                                            <span className="badge bg-primary">{order.status}</span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default MyOrders;
