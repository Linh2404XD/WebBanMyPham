import React, {useEffect, useState} from "react";
import Header from '../../components/header.jsx';
import Footer from '../../components/footer.jsx';
import ProductSlider from "../../components/productSlider.jsx";
import CategoriesSlider from "../../components/categoriesSlider.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";


const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // dùng để reset state
    const [popupVisible, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const { t } = useTranslation();

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
                                    <span>{t("departments")}</span>
                                </div>
                                <ul>
                                    <li><a href="#">{t("category.facialCare")}</a></li>
                                    <li><a href="#">{t("category.makeup")}</a></li>
                                    <li><a href="#">{t("category.bodyCare")}</a></li>
                                    <li><a href="#">{t("category.hairCare")}</a></li>
                                    <li><a href="#">{t("category.sunProtection")}</a></li>
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
                                    <li className="active" data-filter="*">{t("category.all")}</li>
                                    <li data-filter=".oranges">{t("category.facialCare")}</li>
                                    <li data-filter=".fresh-meat">{t("category.makeup")}</li>
                                    <li data-filter=".vegetables">{t("category.bodyCare")}</li>
                                    <li data-filter=".fastfood">{t("category.hairCare")}</li>
                                    <li data-filter=".fastfood">{t("category.sunProtection")}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src="/assets/img/featured/feature-1.jpg" alt="Product"/>
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                        <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src="/assets/img/featured/feature-2.jpg" alt="Product" />
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                        <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6 mix vegetables fresh-meat">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src="/assets/img/featured/feature-3.jpg" alt="Product" />
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                        <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6 mix fastfood oranges">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src="/assets/img/featured/feature-4.jpg" alt="Product" />
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                        <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src="/assets/img/featured/feature-5.jpg" alt="Product" />
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                        <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fastfood">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src="/assets/img/featured/feature-6.jpg" alt="Product" />
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                        <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6 mix fresh-meat vegetables">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src="/assets/img/featured/feature-7.jpg" alt="Product" />
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                        <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-sm-6 mix fastfood vegetables">
                            <div className="featured__item">
                                <div className="featured__item__pic">
                                    <img src="/assets/img/featured/feature-8.jpg" alt="Product" />
                                    <ul className="featured__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                        <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div className="featured__item__text">
                                    <h6><a href="#">Crab Pool Security</a></h6>
                                    <h5>$30.00</h5>
                                </div>
                            </div>
                        </div>
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
