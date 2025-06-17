import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from "../../../components/admin/Sidebar.jsx";

const AddProduct = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        instock: 0,
        imageUrl: "",
        category: ""
    });



    const categories = [
        { value: "facialCare", label: "Chăm sóc da mặt" },
        { value: "sunProtection", label: "Chống nắng" },
        { value: "hairCare", label: "Chăm sóc tóc" },
        { value: "bodyCare", label: "Chăm sóc cơ thể" },
        { value: "makeup", label: "Trang điểm" }
    ];


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Vui lòng đăng nhập trước khi thêm sản phẩm.");
                navigate("/login");
                return;
            }

            const {  ...productWithoutId } = product;

            await axios.post("http://localhost:8080/api/admin/products/add", productWithoutId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            alert("Thêm sản phẩm thành công!");
            navigate("/manage-product");
        } catch (err) {
            console.error("Lỗi thêm sản phẩm:", err);
            alert("Thêm sản phẩm thất bại!");
        }
    };

    return (
        <div className="layout-container d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4">
                <h5 className="mb-4">THÊM SẢN PHẨM</h5>
                <form onSubmit={handleSubmit} className="card p-4" style={{ maxWidth: "900px" }}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Tên sản phẩm</label>
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
                                <label className="form-label">Giá</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    value={product.price}
                                    onChange={handleChange}
                                    required
                                    min={0}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tồn kho</label>
                                <input
                                    type="number"
                                    name="instock"
                                    className="form-control"
                                    value={product.instock}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Loại sản phẩm</label>
                                <select
                                    name="category"
                                    className="form-select"
                                    value={product.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">-- Chọn loại sản phẩm --</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ảnh (URL)</label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    className="form-control"
                                    value={product.imageUrl}
                                    onChange={handleChange}
                                />
                                {product.imageUrl && (
                                    <img
                                        src={product.imageUrl}
                                        alt="Preview"
                                        className="mt-2"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            border: "1px solid #ccc"
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Mô tả</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="10"
                                    value={product.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="text-end">
                        <button type="submit" className="btn btn-success mt-3">Thêm sản phẩm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
