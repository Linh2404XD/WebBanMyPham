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
        { title: "Chăm Sóc Da Mặt", img: "/assets/img/categories/cat-1.jpg" },
        { title: "Trang Điểm", img: "/assets/img/categories/cat-2.jpg" },
        { title: "Chăm Sóc Cơ Thể", img: "/assets/img/categories/cat-3.jpg" },
        { title: "Chăm Sóc Tóc", img: "/assets/img/categories/cat-4.jpg" },
        { title: "Chống Nắng", img: "/assets/img/categories/cat-5.jpg" },
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
                                    height: "180px",          // giữ nguyên khung cao 180px
                                    backgroundSize: "90%",    // ảnh nhỏ lại, chỉ chiếm 40% khung
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    paddingBottom: "15px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            >


                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default CategoriesSlider;
