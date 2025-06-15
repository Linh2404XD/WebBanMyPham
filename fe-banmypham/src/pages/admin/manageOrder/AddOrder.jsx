import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOrder = () => {
    const [orderData, setOrderData] = useState({
        userEmail: '',
        paymentMethod: 'COD',
        status: 'PENDING',
        orderDetails: []
    });

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get("http://localhost:8080/api/admin/products", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Tính tổng tiền tự động
    const calculateTotalAmount = () => {
        return orderData.orderDetails.reduce((total, item) => {
            const product = products.find(p => p.id === parseInt(item.productId));
            const price = product?.price || 0;
            return total + price * item.quantity;
        }, 0);
    };

    // Thêm 1 dòng chi tiết
    const addOrderDetail = () => {
        setOrderData(prev => ({
            ...prev,
            orderDetails: [...prev.orderDetails, { productId: '', quantity: 1 }]
        }));
    };

    // Xử lý thay đổi chi tiết sản phẩm
    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...orderData.orderDetails];
        updatedDetails[index][field] = field === "quantity" ? parseInt(value) : value;
        setOrderData(prev => ({
            ...prev,
            orderDetails: updatedDetails
        }));
    };

    // Xử lý thay đổi thông tin đơn hàng
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Gửi dữ liệu đơn hàng
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const totalAmount = calculateTotalAmount();

            const payload = {
                ...orderData,
                totalAmount
            };

            const res = await axios.post("http://localhost:8080/api/admin/orders/add", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            alert(`Đã thêm đơn hàng #${res.data.id}`);
            // Reset
            setOrderData({
                userEmail: '',
                paymentMethod: 'COD',
                status: 'PENDING',
                orderDetails: []
            });
        } catch (error) {
            console.error("Lỗi thêm đơn hàng:", error);
            alert("Không thể thêm đơn hàng.");
        }
    };

    return (
        <div className="layout-container d-flex">
            <div className="flex-grow-1 p-4">
                <div className="card">
                    <h5 className="card-header">THÊM ĐƠN HÀNG MỚI</h5>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Email Khách Hàng</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="userEmail"
                                    value={orderData.userEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Phương Thức Thanh Toán</label>
                                <select className="form-select" name="paymentMethod" value={orderData.paymentMethod} onChange={handleChange}>
                                    <option value="COD">Thanh toán khi nhận hàng</option>
                                    <option value="BANK_TRANSFER">Chuyển khoản</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label>Trạng Thái</label>
                                <select className="form-select" name="status" value={orderData.status} onChange={handleChange}>
                                    <option value="PENDING">Chờ xử lý</option>
                                    <option value="CONFIRMED">Đã xác nhận</option>
                                    <option value="SHIPPED">Đang giao</option>
                                    <option value="COMPLETED">Hoàn tất</option>
                                    <option value="CANCELLED">Đã huỷ</option>
                                </select>
                            </div>

                            <h6>Chi Tiết Đơn Hàng</h6>
                            {orderData.orderDetails.map((detail, index) => (
                                <div key={index} className="row mb-3">
                                    <div className="col-md-6">
                                        <label>Sản phẩm</label>
                                        <select className="form-select"
                                                value={detail.productId}
                                                onChange={(e) => handleDetailChange(index, "productId", e.target.value)}
                                        >
                                            <option value="">-- Chọn sản phẩm --</option>
                                            {products.map(product => (
                                                <option key={product.id} value={product.id}>
                                                    {product.name} - {product.price.toLocaleString()}₫
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Số lượng</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={detail.quantity}
                                            min="1"
                                            onChange={(e) => handleDetailChange(index, "quantity", e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-secondary mb-3" onClick={addOrderDetail}>
                                + Thêm sản phẩm
                            </button>

                            <div className="mb-3">
                                <label>Tổng tiền</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={calculateTotalAmount().toLocaleString() + "₫"}
                                    readOnly
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Thêm Đơn Hàng</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrder;
