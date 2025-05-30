import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDiscountSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        swipeToSlide: true,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const imageUrls = [
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

    const slides = imageUrls.map((url, index) => (
        <div className="product__discount__item" key={index} style={{ padding: "0 10px" }}>
            <div
                className="product__discount__item__pic"
                style={{
                    backgroundImage: `url(${url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px",
                    position: "relative",
                }}
            >
                <div
                    className="product__discount__percent"
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        backgroundColor: "#ee4d2d",
                        color: "#fff",
                        padding: "5px 10px",
                        fontWeight: "700",
                        borderRadius: "3px",
                        fontSize: "14px",
                    }}
                >
                    -20%
                </div>
                <ul
                    className="product__item__pic__hover"
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                        display: "flex",
                        gap: "10px",
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
            <div className="product__discount__item__text" style={{ padding: "10px 0" }}>
                <span>Sản phẩm</span>
                <h5><a href="#">Tên sản phẩm {index + 1}</a></h5>
                <div className="product__item__price">
                    150.000₫ <span>200.000₫</span>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="product__discount">
            <div className="section-title product__discount__title">
                <h2>Khuyến mãi</h2>
            </div>
            <Slider {...settings}>{slides}</Slider>
        </div>
    );
};

export default ProductDiscountSlider;
