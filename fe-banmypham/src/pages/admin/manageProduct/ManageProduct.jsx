import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../../components/admin/Sidebar.jsx";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);

    // Gọi API lấy danh sách sản phẩm
    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/admin/products');
            setProducts(res.data);
        } catch (err) {
            console.error('Lỗi lấy sản phẩm:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
            try {
                await axios.delete(`http://localhost:8080/api/admin/products/${id}`);
                fetchProducts(); // Load lại
            } catch (err) {
                console.error('Lỗi xoá sản phẩm:', err);
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="layout-container d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <h5 className="mb-4">QUẢN LÝ SẢN PHẨM</h5>
                <div className="card">
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Ảnh</th>
                                <th>Tên</th>
                                <th>Mô tả</th>
                                <th>Giá</th>
                                <th>Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <img
                                            src={p.imageUrl}
                                            alt={p.name}
                                            style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }}
                                        />
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.description}</td>
                                    <td>{p.price.toLocaleString()}₫</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger me-2"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Xoá
                                        </button>
                                        {/* Nút sửa nếu cần */}
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                        Không có sản phẩm nào.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;
