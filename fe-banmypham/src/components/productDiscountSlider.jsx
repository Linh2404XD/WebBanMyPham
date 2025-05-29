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
                    slidesToShow: 1,
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

    const slides = [1, 2, 3, 4, 5, 6].map((item, index) => (
        <div className="product__discount__item" key={index} style={{ padding: "0 10px" }}>
            <div
                className="product__discount__item__pic"
                style={{
                    backgroundImage: `url(/assets/img/product/discount/pd-${item}.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "250px",
                    position: "relative"
                }}
            >
                <div className="product__discount__percent" style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#ee4d2d",
                    color: "#fff",
                    padding: "5px 10px",
                    fontWeight: "700",
                    borderRadius: "3px",
                    fontSize: "14px",
                }}>-20%</div>
                <ul className="product__item__pic__hover" style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    display: "flex",
                    gap: "10px",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                }}>
                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
            <div className="product__discount__item__text" style={{ padding: "10px 0" }}>
                <span>{item === 2 ? "Vegetables" : "Dried Fruit"}</span>
                <h5>
                    <a href="#">
                        {item === 2
                            ? "Vegetables’package"
                            : item === 3
                                ? "Mixed Fruitss"
                                : "Raisin’n’nuts"}
                    </a>
                </h5>
                <div className="product__item__price">
                    $30.00 <span>$36.00</span>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="product__discount">
            <div className="section-title product__discount__title">
                <h2>Sale Off</h2>
            </div>
            <Slider {...settings}>{slides}</Slider>
        </div>
    );
};

export default ProductDiscountSlider;
