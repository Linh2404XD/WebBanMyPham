import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../../../components/admin/Sidebar.jsx";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        imageUrl: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:8080/api/admin/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProduct(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Lỗi khi tải sản phẩm:", err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:8080/api/admin/products/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            alert("Cập nhật sản phẩm thành công!");
            navigate("/manage-product");
        } catch (err) {
            console.error("Lỗi cập nhật sản phẩm:", err);
            alert("Cập nhật thất bại!");
        }
    };

    if (loading) return <p className="text-center mt-5">Đang tải...</p>;

    return (
        <div className="layout-container d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <div className="card shadow p-4">
                    <h4 className="mb-4 text-center text-primary">CHỈNH SỬA SẢN PHẨM</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">ID sản phẩm</label>
                                    <input
                                        type="text"
                                        className="form-control bg-light"
                                        value={product.id}
                                        disabled
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={product.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Giá</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        value={product.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Mô tả</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        rows="5"
                                        value={product.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Ảnh (URL)</label>
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        className="form-control"
                                        value={product.imageUrl}
                                        onChange={handleChange}
                                    />
                                    {product.imageUrl && (
                                        <div className="mt-2">
                                            <img
                                                src={product.imageUrl}
                                                alt="Preview"
                                                className="border rounded"
                                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <button type="submit" className="btn btn-success px-4">Lưu thay đổi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
