import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../../components/admin/Sidebar.jsx";
import axios from 'axios';

const EditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [orderData, setOrderData] = useState({
        userEmail: '',
        paymentMethod: '',
        totalAmount: '',
        status: ''
    });

    const [orderDetails, setOrderDetails] = useState([]);
    const [products, setProducts] = useState([]);
    const [editingDetails, setEditingDetails] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:8080/api/admin/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { user, paymentMethod, totalAmount, status, orderDetails } = res.data;
                setOrderData({
                    userEmail: user.email,
                    paymentMethod,
                    totalAmount,
                    status
                });
                setOrderDetails(orderDetails || []);
            } catch (error) {
                console.error("Lỗi khi tải đơn hàng:", error);
                alert("Không thể tải thông tin đơn hàng.");
            }
        };

        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8080/api/admin/products", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProducts(res.data);
            } catch (err) {
                console.error("Lỗi lấy sản phẩm:", err);
            }
        };

        fetchOrder();
        fetchProducts();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData(prev => ({ ...prev, [name]: value }));
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...orderDetails];
        const detail = updatedDetails[index];

        if (field === "productId") {
            const selectedProduct = products.find(p => p.id === parseInt(value));
            detail.productId = parseInt(value);
            detail.productName = selectedProduct?.name || '';
            detail.unitPrice = selectedProduct?.price || 0;
        } else if (field === "quantity") {
            const qty = parseInt(value);
            detail.quantity = isNaN(qty) ? 1 : qty;
        } else if (field === "unitPrice") {
            const price = parseFloat(value);
            detail.unitPrice = isNaN(price) ? 0 : price;
        }

        setOrderDetails(updatedDetails);
    };

    const addDetail = () => {
        setOrderDetails(prev => [
            ...prev,
            {
                productId: '',
                productName: '',
                quantity: 1,
                unitPrice: 0
            }
        ]);
    };

    const removeDetail = (index) => {
        const updatedDetails = [...orderDetails];
        updatedDetails.splice(index, 1);
        setOrderDetails(updatedDetails);
    };

    const handleUpdateDetails = async () => {
        const orderDetails2 = [...orderDetails];

        const payload = {
            orderDetails: orderDetails2.map(detail => ({
                productId: detail.productId,
                quantity: detail.quantity,
                unitPrice: detail.unitPrice
            }))
        };

        try {
            const token = localStorage.getItem("token");
            console.log(token);
            await axios.put(`http://localhost:8080/api/admin/orders/update-detail/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            alert("Cập nhật chi tiết đơn hàng thành công!");
            setEditingDetails(false);
            navigate("/manage-order");
        } catch (error) {
            console.error("Lỗi khi cập nhật chi tiết đơn hàng:", error);
            alert("Không thể cập nhật chi tiết đơn hàng.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:8080/api/admin/orders/update-status/${id}`, {
                status: orderData.status
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            alert("Cập nhật trạng thái thành công!");
            navigate("/manage-order");
        } catch (error) {
            console.error("Lỗi cập nhật trạng thái:", error);
            alert("Cập nhật trạng thái thất bại!");
        }
    };

    return (
        <div className="layout-container d-flex">
            <div className="flex-grow-1 p-4">
                <div className="card">
                    <h5 className="card-header">CHI TIẾT ĐƠN HÀNG #{id}</h5>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Email Khách Hàng</label>
                                <input type="email" className="form-control" value={orderData.userEmail} disabled />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Phương Thức Thanh Toán</label>
                                <input type="text" className="form-control" value={orderData.paymentMethod} disabled />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tổng Tiền</label>
                                <input type="text" className="form-control" value={Number(orderData.totalAmount).toLocaleString() + '₫'} disabled />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Trạng Thái</label>
                                <select className="form-select" name="status" value={orderData.status} onChange={handleChange}>
                                    <option value="PENDING">Chờ xử lý</option>
                                    <option value="CONFIRMED">Đã xác nhận</option>
                                    <option value="SHIPPED">Đang giao</option>
                                    <option value="COMPLETED">Hoàn tất</option>
                                    <option value="CANCELLED">Đã huỷ</option>
                                </select>
                            </div>

                            <h6>Chi Tiết Đơn Hàng</h6>
                            {!editingDetails ? (
                                <table className="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orderDetails.length === 0 ? (
                                        <tr><td colSpan="4">Không có dữ liệu</td></tr>
                                    ) : (
                                        orderDetails.map((detail, index) => (
                                            <tr key={index}>
                                                <td>{detail.productId}</td>
                                                <td>{detail.productName || 'N/A'}</td>
                                                <td>{detail.quantity}</td>
                                                <td>{Number(detail.unitPrice).toLocaleString()}₫</td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            ) : (
                                <>
                                    {orderDetails.map((detail, index) => (
                                        <div key={index} className="row mb-3 align-items-end">
                                            <div className="col-md-4">
                                                <label>Sản phẩm</label>
                                                <select
                                                    className="form-select"
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
                                            <div className="col-md-2">
                                                <label>Số lượng</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={detail.quantity || 0}
                                                    min="1"
                                                    onChange={(e) => handleDetailChange(index, "quantity", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label>Đơn giá</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={detail.unitPrice || 0}
                                                    onChange={(e) => handleDetailChange(index, "unitPrice", e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <button
                                                    className="btn btn-danger mt-4"
                                                    type="button"
                                                    onClick={() => removeDetail(index)}
                                                >
                                                    Xoá
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="d-flex gap-2 mb-4">
                                        <button type="button" className="btn btn-secondary" onClick={addDetail}>+ Thêm sản phẩm</button>
                                        <button type="button" className="btn btn-success" onClick={handleUpdateDetails}>Lưu</button>
                                    </div>
                                </>
                            )}

                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-primary px-4 me-2">Cập Nhật Trạng Thái</button>
                                <button
                                    type="button"
                                    className="btn btn-warning px-4"
                                    onClick={() => setEditingDetails(true)}
                                >
                                    Chỉnh Sửa Chi Tiết
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditOrder;
