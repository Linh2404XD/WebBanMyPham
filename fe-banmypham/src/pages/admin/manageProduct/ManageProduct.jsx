import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Sidebar from "../../../components/admin/Sidebar.jsx";
import {Link} from "react-router-dom";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [activeTab, setActiveTab] = useState("products");

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8080/api/admin/products", {
                headers: {Authorization: `Bearer ${token}`}
            });
            setProducts(res.data);
        } catch (err) {
            console.error("Lỗi lấy sản phẩm:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xoá sản phẩm này không?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:8080/api/admin/products/${id}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                fetchProducts();
            } catch (err) {
                console.error("Lỗi xoá sản phẩm:", err);
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const renderPagination = () => (
        <div className="d-flex justify-content-center mt-3">
            <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                    >
                        <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="layout-container d-flex">
            <Sidebar/>
            <div className="flex-grow-1 p-3" style={{maxWidth: "1600px", margin: "0 auto"}}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">QUẢN LÝ SẢN PHẨM</h5>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex mb-3 gap-3">
                        <button
                            className={`btn ${activeTab === "products" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setActiveTab("products")}
                        >
                            Quản lý sản phẩm
                        </button>
                        <button
                            className={`btn ${activeTab === "stock" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setActiveTab("stock")}
                        >
                            Quản lý kho
                        </button>
                    </div>
                    <Link to="/manage-product/add-product" className="btn btn-success">
                        <i className="fas fa-plus me-2"></i>Thêm sản phẩm
                    </Link>
                </div>

                {activeTab === "products" && (
                    <div className="card">
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Ảnh</th>
                                    <th>Tên</th>
                                    <th>Mô tả</th>
                                    <th>Giá</th>
                                    <th>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentProducts.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>
                                            <img
                                                src={p.imageUrl}
                                                alt={p.name}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    objectFit: "cover",
                                                    borderRadius: "6px"
                                                }}
                                            />
                                        </td>
                                        <td style={{
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word",
                                            maxWidth: "350px"
                                        }}>{p.name}</td>
                                        <td style={{
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word",
                                            maxWidth: "250px"
                                        }}>
                                            {p.description}
                                        </td>
                                        <td>{p.price.toLocaleString()}₫</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() => window.location.href = `/manage-product/edit-product/${p.id}`}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger me-2"
                                                onClick={() => handleDelete(p.id)}
                                            >
                                                Xoá
                                            </button>
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
                        {renderPagination()}
                    </div>
                )}

                {activeTab === "stock" && (
                    <div className="card">
                        <div className="table-responsive text-nowrap p-3">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Tồn kho</th>
                                    <th>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentProducts.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>
                                            <img
                                                src={p.imageUrl}
                                                alt={p.name}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    objectFit: "cover",
                                                    borderRadius: "6px"
                                                }}
                                            />
                                        </td>
                                        <td style={{
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-word",
                                            maxWidth: "250px"
                                        }}>{p.name}</td>
                                        <td>{p.instock ?? 0}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => {
                                                    const quantity = prompt("Nhập số lượng cần thêm:", "0");
                                                    const added = parseInt(quantity);
                                                    if (!isNaN(added) && added > 0) {
                                                        const token = localStorage.getItem("token");
                                                        axios.put(`http://localhost:8080/api/admin/products/${p.id}/add-stock`, {
                                                            quantity: added
                                                        }, {
                                                            headers: { Authorization: `Bearer ${token}` }
                                                        }).then(() => {
                                                            alert("Cập nhật thành công");
                                                            fetchProducts(); // Reload lại
                                                        }).catch(err => {
                                                            alert("Lỗi khi cập nhật tồn kho");
                                                            console.error(err);
                                                        });
                                                    }
                                                }}
                                            >
                                                <i className="fas fa-plus me-1"></i> Thêm
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            {products.length === 0 && (
                                <p className="text-muted text-center mt-3">Không có dữ liệu sản phẩm.</p>
                            )}
                            {renderPagination()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProduct;
