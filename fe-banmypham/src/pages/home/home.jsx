import React, {useEffect, useState} from "react";
import Header from "../../components/pages/header.jsx";
import Footer from "../../components/pages/footer.jsx";
import ProductSlider from "../../components/pages/productSlider.jsx";
import CategoriesSlider from "../../components/pages/categoriesSlider.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";


const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // dùng để reset state
    const [popupVisible, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const { t } = useTranslation();

    const [showAdPopup, setShowAdPopup] = useState(true); // quảng cáo sẽ tự hiển thị khi truy cập

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; // hoặc 6 hay 12 tuỳ bố cục trang chủ

    const [filterCategory, setFilterCategory] = useState("*");

    const handleCategoryFilter = (category) => {
        setFilterCategory(category);
        setCurrentPage(1);
    };

    const handleCategoryClick = (category) => {
        // category = "*" thì có thể truyền '' hoặc "ALL" tuỳ bạn xử lý ở ShopGrid
        navigate(`/shop-grid?category=${category === "*" ? "" : category}`);
    };

    const filteredProducts =
        filterCategory === "*"
            ? products
            : products.filter((product) => product.category === filterCategory);


    // Lấy các category duy nhất
    const categories = ["*"].concat(
        [...new Set(products.map((p) => p.category))].sort()
    );

    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Lỗi khi gọi API");
                }
                return res.json();
            })
            .then((data) => setProducts(data))
            .catch((err) => console.error("Lỗi khi load sản phẩm:", err));
    }, []);


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    useEffect(() => {
        // Thiết lập background từ data-setbg
        document.querySelectorAll(".set-bg").forEach((el) => {
            const bg = el.getAttribute("data-setbg");
            el.style.backgroundImage = `url(${bg})`;
        });

        // Ẩn preloader sau khi render
        const loader = document.querySelector(".loader");
        const preloader = document.getElementById("preloder");

        if (loader) loader.style.display = "none";
        if (preloader) preloader.style.display = "none";

        // Hiển thị popup nếu được truyền state từ Login hoặc Register
        if (location.state?.showSuccessPopup) {
            setPopupMessage(location.state.message || 'Thành công!');
            setShowPopup(true);

            // Xóa state để tránh hiển thị lại khi reload
            navigate(location.pathname, { replace: true, state: {} });

            // Ẩn popup sau 2 giây
            const timer = setTimeout(() => {
                setShowPopup(false);
            }, 2000);

            return () => clearTimeout(timer);
        }


        // Hiển thị popup quảng cáo trong 3 giây
        const adTimer = setTimeout(() => {
            setShowAdPopup(false);
        }, 3000);

        return () => clearTimeout(adTimer);


    }, [location, navigate]);


    return (
        <>
            {popupVisible && (
                <>
                    {/* Overlay làm mờ nền, click vào thì ẩn popup */}
                    <div
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 999,
                        }}
                        onClick={() => setShowPopup(false)}  // ẩn popup khi click overlay
                    />

                    {/* Popup, ngăn click nổi bọt để không ẩn popup khi click vào */}
                    <div
                        style={{
                            position: 'fixed',
                            top: '30%', left: '50%',
                            transform: 'translate(-50%, -30%)',
                            backgroundColor: '#d4edda',
                            padding: '40px 60px',
                            borderRadius: '12px',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                            color: '#155724',
                            fontSize: '24px',
                            fontWeight: '600',
                            zIndex: 1000,
                            textAlign: 'center',
                            minWidth: '300px',
                        }}
                        onClick={(e) => e.stopPropagation()} // ngăn sự kiện nổi bọt
                    >
                        🎉 {popupMessage}
                    </div>
                </>
            )}

            {showAdPopup && (
                <>
                    <div
                        style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            zIndex: 999,
                        }}
                        onClick={() => setShowAdPopup(false)}
                    />

                    <div
                        style={{
                            position: 'fixed',
                            top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                            zIndex: 1000,
                            overflow: 'hidden',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src="/assets/img/ad.jpg"
                            alt="Quảng cáo"
                            style={{
                                display: 'block',
                                width: '500px',
                                height: 'auto',
                                objectFit: 'cover',
                            }}
                        />
                    </div>
                </>
            )}


            {/* Page Preloader */}
            {/*<div id="preloder">*/}
            {/*    <div className="loader"></div>*/}
            {/*</div>*/}

            {/* Header Section Begin */}
            <Header />
            {/* Header Section End */}

            {/* Hero Section Begin */}
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
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
                                            onClick={() => handleCategoryClick(cat)}
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
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form action="#">
                                        <div className="hero__search__categories">
                                            {t("search.allBrands")}
                                            <i className="fa fa-chevron-down"></i>
                                        </div>
                                        <input type="text" placeholder={t("search.placeholder")}/>
                                        <button type="submit" className="site-btn">
                                            {t("search.button")}
                                        </button>
                                    </form>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone"></i>
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>+65 11.188.888</h5>
                                        <span>{t("search.phone")}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="hero__item"
                                style={{
                                    backgroundImage: `url("/assets/img/hero/banner.jpg")`,
                                    backgroundSize: 'cover',          // Hoặc 'contain' tùy yêu cầu
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    width: '100%',                    // Đảm bảo chiếm toàn bộ chiều ngang
                                    height: '400px',
                                    // Điều chỉnh chiều cao theo mong muốn
                                }}
                            >
                                <div className="hero__text">
                                    <span>FRUIT FRESH</span>
                                    <h2>
                                        Vegetable <br/>
                                        100% Organic
                                    </h2>
                                    <p>Free Pickup and Delivery Available</p>
                                    <a href="#" className="primary-btn">
                                        SHOP NOW
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero Section End */}

            {/*Categories Section Begin*/}
            <CategoriesSlider/>
            {/*Category Section End*/}

            {/*Feature Section Begin*/}
                <section className="featured spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title">
                                    <h2>{t('category.featuredProduct')}</h2>
                                </div>
                                <div className="featured__controls">
                                    <ul>
                                        {categories.map((cat, i) => (
                                            <li
                                                key={i}
                                                className={filterCategory === cat ? "active" : ""}
                                                onClick={() => handleCategoryFilter(cat)}
                                                style={{ cursor: "pointer" }}
                                            >
                                                {cat === "*" ? t("category.all") : cat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row featured__filter">
                            {currentProducts.map((product, index) => (
                                <div key={product.id || index} className="col-lg-3 col-md-4 col-sm-6 mix">
                                    <div className="featured__item">
                                        <div className="featured__item__pic">
                                            <img src={product.imageUrl} alt={product.name} onClick={() => navigate(`/product-detail/${product.id}`)} />
                                            <ul className="featured__item__pic__hover">
                                                <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                                <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                                <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="featured__item__text">
                                            <h6><a href={`/product-detail/${product.id}`}>{product.name}</a></h6>
                                            <h5>{Number(product.price).toLocaleString('vi-VN')}₫</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/*phân trang*/}
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
                </section>
            {/*Feature Section End */}

            {/*Banner Begin*/}
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img style={{height:"240px"}} src="/assets/img/banner/banner-1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="banner__pic">
                                <img style={{height:"240px"}} src="/assets/img/banner/banner-2.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Banner End*/}

            {/*Latest Product Section Begin*/}
           <ProductSlider/>
            {/*Lastest Product Section End*/}

            {/*Footer Section Begin*/}
            <Footer/>
            {/*Footer Section End*/}
        </>
    );
};

export default HomePage;
