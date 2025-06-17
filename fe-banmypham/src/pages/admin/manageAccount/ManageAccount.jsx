import React, {useEffect, useState} from 'react';
import Sidebar from "../../../components/admin/Sidebar.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Outlet } from "react-router-dom";

const ManageAccount = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8080/api/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(res.data);
        } catch (err) {
            console.error("Lỗi lấy danh sách người dùng:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (!window.confirm("Bạn có chắc muốn xóa người dùng này?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(prev => prev.filter(u => u.id !== userId));
        } catch (err) {
            console.error("Xóa thất bại:", err);
            alert("Đã xảy ra lỗi khi xóa.");
        }
    };

    return (
        <div className="layout-container d-flex">
            <Sidebar/>
            <div className="flex-grow-1 p-4">
                <div className="card">
                    <h5 className="card-header">QUẢN LÝ TÀI KHOẢN</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Roles</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">Không có người dùng nào</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            {user.roles?.map(r => (
                                                <span key={r.id} className="badge bg-label-secondary me-1">
                                                        {r.name.replace("ROLE_", "")}
                                                    </span>
                                            ))}
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="icon-base bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => navigate(`/manage-account/edit-account/${user.id}`)}
                                                        >
                                                            <i className="bx bx-edit-alt me-2"></i> Edit
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            className="dropdown-item"
                                                            onClick={() => handleDelete(user.id)}
                                                        >
                                                            <i className="bx bx-trash me-2"></i> Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default ManageAccount;
