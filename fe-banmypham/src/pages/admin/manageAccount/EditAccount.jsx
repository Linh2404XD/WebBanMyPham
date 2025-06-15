import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../../../components/admin/Sidebar.jsx";

const EditAccount = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phoneNumber: '',
        address: '',
        roles: [],
    });

    const [allRoles, setAllRoles] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/admin/users/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const user = res.data;
                setFormData({
                    fullName: user.fullName || '',
                    username: user.username || '',
                    email: user.email || '',
                    phoneNumber: user.phoneNumber || '',
                    address: user.address || '',
                    roles: user.roles || []
                });
            } catch (err) {
                console.error("Lỗi khi tải thông tin người dùng:", err);
            }
        };

        const fetchRoles = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/roles/admin`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAllRoles(res.data);
            } catch (err) {
                console.error("Lỗi khi tải danh sách vai trò:", err);
            }
        };

        fetchUser();
        fetchRoles();
    }, [id]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:8080/api/admin/users/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Cập nhật thành công!");
            navigate("/manage-account");
        } catch (err) {
            console.error("Lỗi khi cập nhật:", err);
            alert("Cập nhật thất bại.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Bạn có chắc muốn xóa tài khoản này không?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Xóa thành công!");
            navigate("/manage-account");
        } catch (err) {
            console.error("Xóa thất bại:", err);
            alert("Có lỗi xảy ra khi xóa.");
        }
    };

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <h5 className="card-header">Chỉnh sửa tài khoản</h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label htmlFor="fullName" className="form-label">Họ và tên</label>
                                        <input type="text" className="form-control" id="fullName"
                                               value={formData.fullName} onChange={handleChange}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="username" className="form-label">Tên người dùng</label>
                                        <input type="text" className="form-control" id="username"
                                               value={formData.username} onChange={handleChange}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" value={formData.email}
                                               disabled/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
                                        <input type="text" className="form-control" id="phoneNumber"
                                               value={formData.phoneNumber} onChange={handleChange}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                                        <input type="text" className="form-control" id="address"
                                               value={formData.address} onChange={handleChange}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="roles" className="form-label">Vai trò</label>
                                        <select
                                            id="roles"
                                            className="form-select"
                                            value={formData.roles[0]?.id || ""}
                                            onChange={(e) => {
                                                const selectedId = parseInt(e.target.value);
                                                const selectedRole = allRoles.find(role => role.id === selectedId);
                                                if (selectedRole) {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        roles: [selectedRole]
                                                    }));
                                                }
                                            }}
                                        >
                                            <option disabled value="">-- Chọn vai trò --</option>
                                            {allRoles.map(role => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name.replace("ROLE_", "")}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="btn btn-primary me-3">Lưu thay đổi</button>
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Xóa tài khoản</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl">
                    <div className="footer-container d-flex justify-content-between py-4">
                        <div>&copy; {currentYear}, made with ❤️ by <a href="https://themeselection.com" target="_blank" rel="noreferrer">ThemeSelection</a></div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EditAccount;
