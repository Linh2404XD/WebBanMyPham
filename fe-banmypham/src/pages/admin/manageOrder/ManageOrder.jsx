import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/admin/Sidebar.jsx";
import axios from "axios";
import {Outlet} from "react-router-dom";

const ManageOrder = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token"); // hoặc lấy từ context nếu bạn có
            const res = await axios.get("http://localhost:8080/api/admin/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(res.data);
        } catch (err) {
            console.error("Lỗi lấy đơn hàng:", err);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xoá đơn hàng này?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/admin/orders/delete/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Đã xoá đơn hàng thành công!");
            // Cập nhật lại danh sách sau khi xoá
            setOrders(prev => prev.filter(order => order.id !== orderId));
        } catch (error) {
            console.error("Lỗi khi xoá đơn hàng:", error);
            alert("Xoá đơn hàng thất bại.");
        }
    };


    return (
        <div className="layout-container d-flex">
            <Sidebar />

            <div className="flex-grow-1">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">QUẢN LÝ ĐƠN HÀNG</h5>
                        <button className="btn btn-success"
                                onClick={() => window.location.href = "/manage-order/add-order"}>
                            <i className="bx bx-plus me-1"></i>Thêm đơn hàng
                        </button>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Khách hàng</th>
                                <th>Phương thức</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">Không có đơn hàng nào</td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user?.email || "Ẩn"}</td>
                                        <td>{order.paymentMethod}</td>
                                        <td>{order.totalAmount?.toLocaleString()}₫</td>
                                        <td>
                                            <span className="badge bg-label-info">{order.status}</span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => window.location.href = `/manage-order/edit-order/${order.id}`}
                                            >
                                                <i className="bx bx-edit"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(order.id)}
                                            >
                                                <i className="bx bx-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Outlet/>
            </div>

        </div>
    );
};

export default ManageOrder;
