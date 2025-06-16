import React, { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import { useTranslation } from "react-i18next";

import axios from "axios";
import Footer from "../../components/footer.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";

const ShopGrid = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    // lấy category ở url được gửi từ home
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category") || "";
    const keyword = searchParams.get("keyword")?.toLowerCase() || "";


    // Trạng thái lọc category và phân trang
    const [filterCategory, setFilterCategory] = useState(categoryFromUrl || "*");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop-grid?keyword=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    // nên viết ra 1 file riêng để tái sử dụng
    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập trước.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:8080/api/cart-items/add",
                {
                    productId: productId,
                    quantity: 1
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
        }
    };
    useEffect(() => {
        setFilterCategory(categoryFromUrl || "*");
        setCurrentPage(1); // reset trang về 1 khi filter thay đổi
    }, [categoryFromUrl]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Lấy danh sách category duy nhất từ products
    const categories = ["*"].concat(
        [...new Set(products.map((p) => p.category))].sort()
    );

    const handleCategoryFilter = (category) => {
        setFilterCategory(category);
        setCurrentPage(1);
        navigate(`/shop-grid?category=${encodeURIComponent(category)}`);
    };

    // Lọc products theo category
    const filteredProducts = products.filter((product) => {
        const matchKeyword = product.name.toLowerCase().includes(keyword);
        const matchCategory = filterCategory === "*" || product.category === filterCategory;
        return matchKeyword && matchCategory;
    });



    // Xác định danh sách sản phẩm hiển thị theo keyword hoặc category
    let displayedProducts = products;

    if (keyword) {
        displayedProducts = products.filter((product) =>
            product.name.toLowerCase().includes(keyword)
        );
    } else if (filterCategory !== "*") {
        displayedProducts = products.filter((product) =>
            product.category === filterCategory
        );
    }


    // Phân trang trên filteredProducts
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = displayedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    return (
        <>
            <Header />
            {/* Thanh search + phone */}
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

            <section className="product spad">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-lg-3 col-md-5">
                            <div className="hero__categories">
                                <div className="hero__categories__all">
                                    <i className="fa fa-bars"></i>
                                    <span>{t("category.departments")}</span>
                                </div>
                                <ul style={{ fontSize: "20px" }}>
                                    {categories.map((cat, i) => (
                                        <li
                                            key={i}
                                            className={filterCategory === cat ? "active" : ""}
                                            onClick={() => handleCategoryFilter(cat)}
                                            style={{
                                                cursor: "pointer",
                                                fontWeight: filterCategory === cat ? "bold" : "normal",
                                            }}
                                        >
                                            {cat === "*" ? t("category.all") : t(`category.${cat}`)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Main product area */}
                        <div className="col-lg-9 col-md-7">
                            <div className="filter__item">
                                <div className="row">
                                    {currentProducts.map((product) => (
                                        <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                                            <div className="product__item">
                                                <div
                                                    className="product__item__pic"
                                                    style={{
                                                        backgroundImage: `url(${product.imageUrl})`,
                                                        backgroundSize: "contain",
                                                        backgroundPosition: "center",
                                                        height: "300px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => navigate(`/product-detail/${product.id}`)}
                                                >
                                                    <ul className="product__item__pic__hover">
                                                        <li>
                                                            <button
                                                                style={{
                                                                    background: "none",
                                                                    border: 'none',
                                                                    width: "40px",
                                                                    height: "40px",
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    fontSize: "30px", // vừa đủ lớn
                                                                    cursor: "pointer",
                                                                    transition: "all 0.3s",
                                                                }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleAddToCart(product.id);
                                                                }}
                                                            >
                                                                <i className="fa fa-shopping-cart" style={{ color: "#1c1c1c" }}></i>
                                                            </button>
                                                        </li>

                                                    </ul>
                                                </div>
                                                <div className="product__item__text">
                                                    <h6>
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                navigate(`/product-detail/${product.id}`);
                                                            }}
                                                        >
                                                            {product.name}
                                                        </a>
                                                    </h6>
                                                    <h5>{product.price.toLocaleString("vi-VN")} ₫</h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="product__pagination">
                                {[...Array(totalPages)].map((_, i) => (
                                    <a
                                        key={i + 1}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            paginate(i + 1);
                                        }}
                                        className={currentPage === i + 1 ? "active" : ""}
                                    >
                                        {i + 1}
                                    </a>
                                ))}
                                {totalPages > 0 && (
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < totalPages) paginate(currentPage + 1);
                                        }}
                                    >
                                        <i className="fa fa-long-arrow-right"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ShopGrid;