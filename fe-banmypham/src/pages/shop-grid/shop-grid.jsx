import React, { useState } from "react";
import ProductDiscountSlider from "../../components/productDiscountSlider.jsx";
import Header from "../../components/header.jsx";
import {useTranslation} from "react-i18next";
import "./shop-grip.css";

const ShopGrid = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null); // để xác định menu nào đang mở

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

    const imageUrls = [
        "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-sua-rua-mat-cerave-sach-sau-cho-da-thuong-den-da-dau-473ml_UPD5askwoJczPE2w.png",
        "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-nuoc-hoa-hong-khong-mui-klairs-danh-cho-da-nhay-cam-180ml_JVoHuqzmkpmiasnQ.png",
        "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-combo-2-nuoc-tay-trang-bi-dao-cocoon-lam-sach-giam-dau-500ml_9DNL7aSGPGTRKWio.png",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-253900006-1695973833.jpg",
        "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-kem-chong-nang-l-oreal-paris-x20-thoang-da-mong-nhe-50ml_vjBDMGk2ugwg5bMh.png",
        "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-tinh-chat-l-oreal-hyaluronic-acid-cap-am-sang-da-30ml_KUY9EPVQTu8BVMUz.png",
        "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-nuoc-tay-trang-l-oreal-paris-3-in-1-duong-am-danh-cho-da-thuong-da-kho-400ml_NhbSkShR7VD2ndaM.png",
        "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-kem-duong-am-ban-dem-olay-lam-sang-da-mo-tham-nam-50g_foNqowP9whF1drKA.png",
        "https://media.hcdn.vn/catalog/product/g/o/google-shopping-mascara-maybelline-toi-dai-mi-khong-gioi-han-6ml-moi-1747799393_img_80x80_d200c5_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/p/r/promotions-auto-combo-2-tui-refill-tay-da-chet-toan-than-cocoon-sach-da-600ml_2AoaZ2oQ59mjTdSa.png",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-chong-nang-d-alba-nang-tong-sang-hong-tu-nhien-50ml-1738749816_img_300x300_b798dd_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-la-roche-posay-ho-tro-phuc-hoi-da-30ml-1716438988_img_300x300_b798dd_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-nen-maybelline-bat-sang-che-phu-sieu-nhe-110-35ml-1726112811_img_300x300_b798dd_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-422204906-1696235881_img_300x300_b798dd_fit_center.png",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-duong-obagi-retinol-0-5-ngan-ngua-lao-hoa-da-28g-1741328912_img_300x300_b798dd_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-duong-am-neutrogena-cung-cap-nuoc-cho-da-50g-1738828668_img_300x300_b798dd_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-combo-10-mat-na-bnbg-vitamin-b-phuc-hoi-da-30ml-moi-1735611138_img_300x300_b798dd_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-serum-d-alba-dang-xit-nam-truffle-trang-cang-bong-da-100ml-1729484697_img_300x300_b798dd_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-kem-chong-nang-la-roche-posay-spf-50-bao-ve-da-50ml-1739865080_img_300x300_b798dd_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-422206154-1701683303_img_300x300_b798dd_fit_center.png",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-sua-rua-mat-cerave-tao-bot-cho-da-thuong-den-da-dau-88ml-1741158211_img_300x300_b798dd_fit_center.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-sua-chong-nang-acnes-ngan-ngua-mun-cho-da-mun-nhay-cam-50g-1739265210.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-gel-rua-mat-acnes-giup-kiem-soat-nhon-100g-1739427250.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-tinh-chat-acnes-vitamin-c-lam-mo-seo-vet-tham-15ml-1739415262.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-mieng-dan-mun-acnes-24-mieng-1739428078.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-sua-chong-nang-anessa-duong-da-kiem-dau-60ml-moi-1710558154.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-gel-chong-nang-anessa-duong-sang-nang-tong-90g-moi-1710558240.jpg",
        "https://media.hcdn.vn/catalog/product/f/a/facebook-dynamic-serum-chong-nang-anessa-duong-da-nang-tong-30ml-1738914326.jpg"
    ];


    return (
        <>
            {/* Page Preloader */}
            <div id="preloder">
                <div className="loader"></div>
            </div>



            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="hero hero-normal">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">

                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product spad">
                <div className="container">
                    <div className="row">
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
                                <div className="sidebar__item">
                                    <h4>Price</h4>
                                    <div className="price-range-wrap">
                                        <div
                                            className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                                            data-min="10" data-max="540">
                                            <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                                            <span tabIndex="0"
                                                  className="ui-slider-handle ui-corner-all ui-state-default"></span>
                                            <span tabIndex="0"
                                                  className="ui-slider-handle ui-corner-all ui-state-default"></span>
                                        </div>
                                        <div className="range-slider">
                                            <div className="price-input">
                                                <input type="text" id="minamount"/>
                                                <input type="text" id="maxamount"/>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <div className="sidebar__item">
                                <h4>Popular Size</h4>
                                <div className="sidebar__item__size">
                                    <label htmlFor="large">
                                        Large
                                        <input type="radio" id="large" />
                                    </label>
                                </div>
                                <div className="sidebar__item__size">
                                    <label htmlFor="medium">
                                        Medium
                                        <input type="radio" id="medium" />
                                    </label>
                                </div>
                                <div className="sidebar__item__size">
                                    <label htmlFor="small">
                                        Small
                                        <input type="radio" id="small" />
                                    </label>
                                </div>
                                <div className="sidebar__item__size">
                                    <label htmlFor="tiny">
                                        Tiny
                                        <input type="radio" id="tiny" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-7">
                       <ProductDiscountSlider/>

                        <div className="filter__item">
                            <div className="row">
                                {imageUrls.map((url, i) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6" key={i}>
                                        <div className="product__item">
                                            <div
                                                className="product__item__pic"
                                                style={{
                                                    backgroundImage: `url(${url})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    height: '300px',
                                                }}
                                            >
                                                <ul className="product__item__pic__hover">
                                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                                    <li><a href="/cart"><i className="fa fa-shopping-cart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div className="product__item__text">
                                                <h6><a href="#">Crab Pool Security</a></h6>
                                                <h5>$30.00</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="product__pagination">
                            <a href="#">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <a href="#"><i className="fa fa-long-arrow-right"></i></a>
                        </div>

                    </div>
                </div>
            </div>
            </section>
        </>
    );
};

export default ShopGrid;