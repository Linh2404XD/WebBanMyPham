import React, {useEffect, useState} from "react";
import Header from "../../components/header.jsx";
import Footer from "../../components/footer.jsx";
import CategoriesSlider from "../../components/categoriesSlider.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";


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


    // tìm kiếm
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/shop-grid?keyword=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

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
                                <div className="hero__search__form"  style={{marginBottom : '20px'}}>
                                    <form onSubmit={handleSearchSubmit}>
                                        <input
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
                                                {cat === "*" ? t("category.all") : t(`category.${cat}`)}
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
                                                <li>
                                                    <button
                                                        onClick={() => handleAddToCart(product.id)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            padding: 0,
                                                            margin: 0,
                                                            cursor: 'pointer',
                                                            color: 'black',
                                                            position: 'absolute',
                                                            top: '50%',
                                                            left: '50%',
                                                            transform: 'translate(-50%, -50%)',
                                                            fontSize: '30px',
                                                        }}
                                                    >
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </button>
                                                </li>
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
        </>
    );
};

export default HomePage;
