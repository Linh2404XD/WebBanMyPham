import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";

const ProductDetail = () => {
    const { id } = useParams(); // lấy productId từ URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Lấy chi tiết sản phẩm
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            });
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập trước.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                "http://localhost:8080/api/cart-items/add",
                {
                    productId: productId,
                    quantity: quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert("Đã thêm vào giỏ hàng!");
        } catch (err) {
            console.error("Lỗi khi thêm giỏ hàng:", err);
            alert("Thêm thất bại!");
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <div className="text-center my-5">Đang tải dữ liệu sản phẩm...</div>;





    return (
        <>
            <Header />
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        {/* Hình ảnh sản phẩm */}
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__pic">
                                <div className="product__details__pic__item">
                                    <img
                                        className="product__details__pic__item--large"
                                        src={product.imageUrl || "/assets/img/product/default.jpg"}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="product__details__pic__slider owl-carousel">
                                    <img src="/assets/img/product/details/thumb-1.jpg" alt="thumb" />
                                    <img src="/assets/img/product/details/thumb-2.jpg" alt="thumb" />
                                    <img src="/assets/img/product/details/thumb-3.jpg" alt="thumb" />
                                </div>
                            </div>
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div className="col-lg-6 col-md-6">
                            <div className="product__details__text">
                                <h3>{product.name}</h3>
                                <div className="product__details__price">
                                    {product.price?.toLocaleString("vi-VN")} ₫
                                </div>
                                <p>{product.description}</p>
                                <div className="product__details__quantity">
                                    <div className="quantity">
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            min="1"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                                <button
                                    className="primary-btn"
                                    onClick={() => handleAddToCart(product.id)}
                                    disabled={loading}
                                >
                                    {loading ? "Đang thêm..." : "THÊM VÀO GIỎ HÀNG"}
                                </button>
                                <a href="#" className="heart-icon">
                                    <span className="icon_heart_alt"></span>
                                </a>
                                <ul>
                                    <li><b>Tình trạng:</b> <span>{product.instock > 0 ? "Còn hàng" : "Hết hàng"}</span></li>
                                    <li><b>Giao hàng:</b> <span>Giao nhanh trong 24h</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ProductDetail;
