import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoriesSlider = () => {
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

    const categories = [
        { title: "Fresh Fruit", img: "/assets/img/categories/cat-1.jpg" },
        { title: "Dried Fruit", img: "/assets/img/categories/cat-2.jpg" },
        { title: "Vegetables", img: "/assets/img/categories/cat-3.jpg" },
        { title: "Drink Fruits", img: "/assets/img/categories/cat-4.jpg" },
        { title: "Drink Fruits", img: "/assets/img/categories/cat-5.jpg" },
    ];

    return (
        <section className="categories">
            <div className="container">
                <Slider {...settings} className="categories__slider">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="categories__item-wrapper"
                            style={{
                                padding: "0 12px",
                                boxSizing: "border-box",
                            }}
                        >
                            <div
                                className="categories__item"
                                style={{
                                    backgroundImage: `url(${cat.img})`,
                                    height: "180px",
                                    backgroundSize: "contain",   // thu nhỏ ảnh
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundColor: "#f7f7f7",  // tô màu nền ô
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // đổ bóng nhẹ
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    paddingBottom: "15px",
                                    color: "#333",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            >
                                <h5 style={{ margin: 0 }}>
                                    <a
                                        href="#"
                                        style={{
                                            color: "inherit",
                                            textDecoration: "none",
                                            userSelect: "none",
                                        }}
                                    >
                                        {cat.title}
                                    </a>
                                </h5>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default CategoriesSlider;
