import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/pages/header.jsx";
import Footer from "../../components/pages/footer.jsx";

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

    const handleAddToCart = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        console.log("User:", user);
        if (!user || !user.userId || !token) {
            alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
            return;
        }

        if (!product) return;

        setLoading(true);
        try {
            // 1. Lấy giỏ hàng của user (kèm Authorization header)
            const cartResponse = await axios.get(`http://localhost:8080/api/carts/user/${user.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const cartId = cartResponse.data.id;

            // 2. Tạo cartItem payload
            const cartItem = {
                cartId: cartId,
                productId: product.id,
                quantity: quantity
            };

            // 3. Gửi yêu cầu thêm sản phẩm vào giỏ hàng (kèm Authorization header)
            await axios.post("http://localhost:8080/api/cart-items", cartItem, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert(`Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng.`);
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
            alert("Thêm sản phẩm vào giỏ hàng thất bại.");
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
                                <button className="primary-btn" onClick={handleAddToCart} disabled={loading}>
                                    {loading ? "Đang thêm..." : "THÊM VÀO GIỎ HÀNG"}
                                </button>
                                <a href="#" className="heart-icon">
                                    <span className="icon_heart_alt"></span>
                                </a>
                                <ul>
                                    <li><b>Tình trạng:</b> <span>{product.inStock ? "Còn hàng" : "Hết hàng"}</span></li>
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
