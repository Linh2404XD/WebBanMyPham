import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


const ProductDetail = () => {
    const { id } = useParams(); // lấy productId từ URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();


    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Lấy danh sách sản phẩm dùng cho search suggestions
        axios.get("http://localhost:8080/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error("Lỗi khi lấy danh sách sản phẩm:", err));
    }, []);

    // tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop-grid?keyword=${encodeURIComponent(searchTerm.trim())}`);
        }
    };


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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#f5f5f5",
                    marginBottom: "-50px"
                }}
            >
                <div className="hero__search__form">
                    <form onSubmit={handleSearchSubmit} style={{ display: "flex" }}>
                        <input
                            onBlur={() => {
                                setTimeout(() => setSuggestions([]), 150); // Delay nhẹ để tránh xung đột với click suggestion
                            }}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchTerm(value);
                                const filtered = products.filter((p) =>
                                    p.name.toLowerCase().includes(value.toLowerCase())
                                );
                                setSuggestions(value ? filtered.slice(0, 5) : []);
                            }}
                            placeholder={t("search.placeholder")}
                            style={{ padding: "8px", borderRadius: "4px 0 0 4px", border: "1px solid #ccc" }}
                        />
                        <button
                            type="submit"
                            className="site-btn"
                            style={{ borderRadius: "0 4px 4px 0", padding: "8px 12px" }}
                        >
                            {t("search.button")}
                        </button>
                    </form>
                    {suggestions.length > 0 && (
                        <ul style={{
                            position: "absolute",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                            width: "100%",
                            maxHeight: "200px",
                            overflowY: "auto",
                            listStyle: "none",
                            padding: "0",
                            margin: "4px 0",
                            zIndex: 999
                        }}>
                            {suggestions.map((item) => (
                                <li
                                    key={item.id}
                                    style={{
                                        padding: "8px",
                                        cursor: "pointer",
                                        borderBottom: "1px solid #eee",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}
                                    onClick={() => {
                                        navigate(`/product-detail/${item.id}`);
                                    }}
                                >
                                    {/* Ảnh thumbnail */}
                                    <img
                                        src={item.imageUrl || "/assets/img/product/default.jpg"}
                                        alt={item.name}
                                        style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                                    />

                                    {/* Thông tin tên và giá */}
                                    <div>
                                        <div style={{ fontWeight: "500" }}>{item.name}</div>
                                        <div style={{ fontSize: "14px", color: "#000000" }}>
                                            {item.price?.toLocaleString("vi-VN")} ₫
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

                <div className="hero__search__phone" style={{ display: "flex", alignItems: "center" }}>
                    <div className="hero__search__phone__icon" style={{ marginRight: "8px" }}>
                        <i className="fa fa-phone"></i>
                    </div>
                    <div className="hero__search__phone__text">
                        <h5 style={{ margin: 0 }}>+65 11.188.888</h5>
                        <span>{t("search.phone")}</span>
                    </div>
                </div>
            </div>
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
                                        style={{
                                            maxWidth: "100%",    // ảnh không vượt quá container cha
                                            height: "500px",      // giữ tỉ lệ ảnh
                                            objectFit: "contain" // ảnh sẽ co giãn vừa trong vùng chứa mà không bị cắt
                                        }}
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
