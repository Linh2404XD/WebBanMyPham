import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/admin/Sidebar.jsx";
import axios from "axios";

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

    return (
        <div className="layout-container d-flex">
            <Sidebar />
            <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                {/* Avatar Dropdown */}
                <ul className="navbar-nav flex-row align-items-center">
                    <li className="nav-item dropdown-user dropdown">
                        <button className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                            <div className="avatar avatar-online">
                                <img
                                    src="../assets/img/avatars/1.png"
                                    alt="avatar"
                                    className="w-px-40 h-auto rounded-circle"
                                />
                            </div>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-user me-2"></i>
                                    <span className="align-middle">My Profile</span>
                                </a>
                            </li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-power-off me-2"></i>
                                    <span className="align-middle">Log Out</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="flex-grow-1">
                <div className="card">
                    <h5 className="card-header">QUẢN LÝ ĐƠN HÀNG</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Khách hàng</th>
                                <th>Phương thức</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
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
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageOrder;
