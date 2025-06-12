import React, {useEffect, useState} from "react";
import ProductDiscountSlider from "../../components/productDiscountSlider.jsx";
import Header from "../../components/header.jsx";
import {useTranslation} from "react-i18next";
import "./shop-grip.css";
import axios from "axios";
import Footer from "../../components/footer.jsx";
import {useNavigate} from "react-router-dom";

const ShopGrid = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);


    // Thêm state quản lý trang hiện tại và số sản phẩm mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    useEffect(() => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.error('Response error:', error.response.status, error.response.data);
                } else if (error.request) {
                    console.error('No response:', error.request);
                } else {
                    console.error('Axios error:', error.message);
                }
            });
    }, []);


    // Tính chỉ số sản phẩm đầu và cuối của trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // Lấy ra mảng sản phẩm cần hiển thị của trang hiện tại
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Tính tổng số trang
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Hàm chuyển trang
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // tùy chọn cuộn lên đầu trang khi đổi trang
    };

    const toggleSubmenu = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const categories = [
        {
            label: t("category.facialCare"),
            items: t("items.facialCare", { returnObjects: true }),
        },
        {
            label: t("category.makeup"),
            items: t("items.makeup", { returnObjects: true }),
        },
        {
            label: t("category.bodyCare"),
            items: t("items.bodyCare", { returnObjects: true }),
        },
        {
            label: t("category.hairCare"),
            items: t("items.hairCare", { returnObjects: true }),
        },
        {
            label: t("category.sunProtection"),
            items: t("items.sunProtection", { returnObjects: true }),
        },
    ];

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
                                    <ul>
                                        {categories.map((cat, index) => (
                                            <li
                                                key={index}
                                                className={openIndex === index ? "open" : ""}
                                                onClick={() => toggleSubmenu(index)}
                                                style={{cursor: "pointer"}}
                                            >
                                                <a>{cat.label}</a>
                                                <ul className="submenu"
                                                    style={{display: openIndex === index ? "block" : "none"}}>
                                                    {cat.items.map((item, i) => (
                                                        <li key={i}><a href="#">{item}</a></li>
                                                    ))}
                                                </ul>
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
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        height: '300px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => navigate(`/product-detail/${product.id}`)}
                                                >
                                                    <ul className="product__item__pic__hover">
                                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
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
                                                    <h5>{product.price.toLocaleString('vi-VN')} ₫</h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Phân trang */}
                            <div className="product__pagination">
                                {[...Array(totalPages)].map((_, i) => (
                                    <a
                                        key={i + 1}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            paginate(i + 1);
                                        }}
                                        className={currentPage === i + 1 ? 'active' : ''}
                                    >
                                        {i + 1}
                                    </a>
                                ))}
                                {totalPages > 0 && (
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        if(currentPage < totalPages) paginate(currentPage + 1);
                                    }}>
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
