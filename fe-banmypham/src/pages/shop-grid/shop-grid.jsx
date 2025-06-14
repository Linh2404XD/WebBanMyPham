import React, { useEffect, useState } from "react";
import Header from "../../components/header.jsx";
import { useTranslation } from "react-i18next";
import "./shop-grip.css";
import axios from "axios";
import Footer from "../../components/footer.jsx";
import { useNavigate } from "react-router-dom";

const ShopGrid = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    // Trạng thái lọc category và phân trang
    const [filterCategory, setFilterCategory] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

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
    const uniqueCategories = [
        "ALL",
        ...Array.from(new Set(products.map((p) => p.category))),
    ];

    const handleCategoryFilter = (category) => {
        setFilterCategory(category);
        setCurrentPage(1);
    };

    // Lọc products theo category
    const filteredProducts =
        filterCategory === "ALL"
            ? products
            : products.filter((product) => product.category === filterCategory);

    // Phân trang trên filteredProducts
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <Header />

            <section className="product spad">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-lg-3 col-md-5">
                            <div className="sidebar">
                                <div className="sidebar__item">
                                    <h4>{t("category.departments")}</h4>
                                    <ul style={{ fontSize: "20px" }}>
                                        {uniqueCategories.map((cat, i) => (
                                            <li
                                                key={i}
                                                className={filterCategory === cat ? "active" : ""}
                                                onClick={() => handleCategoryFilter(cat)}
                                                style={{
                                                    cursor: "pointer",
                                                    fontWeight: filterCategory === cat ? "bold" : "normal",
                                                }}
                                            >
                                                {cat === "ALL" ? t("category.all") : cat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        height: "300px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => navigate(`/product-detail/${product.id}`)}
                                                >
                                                    <ul className="product__item__pic__hover">
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-heart"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i className="fa fa-retweet"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="/cart">
                                                                <i className="fa fa-shopping-cart"></i>
                                                            </a>
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
