import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ProductItem = ({ href, imgSrc, name, price }) => {
    const handleMouseDown = (e) => e.preventDefault();

    return (
        <a href={href} className="latest-product__item" onMouseDown={handleMouseDown}>
            <div className="latest-product__item__pic">
                <img src={imgSrc} alt={name} />
            </div>
            <div className="latest-product__item__text">
                <h6>{name}</h6>
                <span>{price}</span>
            </div>
        </a>
    );
};


const ProductSlider = ({ title, productGroups }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="latest-product__text">
            <h4>{title}</h4>
            <Slider {...settings}>
                {productGroups.map((group, index) => (
                    <div className="latest-prdouct__slider__item" key={index}>
                        {group.map((product, i) => (
                            <ProductItem key={i} {...product} />
                        ))}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

// Dữ liệu sản phẩm
const latestProductSlides = [
    [
        {
            href: "#",
            imgSrc: "/assets/img/latest-product/lp-1.jpg",
            name: "Serum Chống Nắng Anessa Dưỡng Da Nâng Tông 30ml",
            price: "529.000₫",
        },
        {
            href: "#",
            imgSrc: "/assets/img/latest-product/lp-2.jpg",
            name: "Gel Chống Nắng Anessa Dưỡng Sáng Nâng Tông 90g",
            price: "310.000₫",
        },
        {
            href: "#",
            imgSrc: "/assets/img/latest-product/lp-3.jpg",
            name: "Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới)",
            price: "423.000₫",
        },
    ],
    [
        {
            href: "#",
            imgSrc: "/assets/img/product/product-4.jpg",
            name: "Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới)",
            price: "423.000₫",
        },
    ],
];

const topRatedSlides = [
    [
        {
            href: "#",
            imgSrc: "/assets/img/latest-product/lp-1.jpg",
            name: "Serum Chống Nắng Anessa Dưỡng Da Nâng Tông 30ml",
            price: "529.000₫",
        },
        {
            href: "#",
            imgSrc: "/assets/img/latest-product/lp-2.jpg",
            name: "Gel Chống Nắng Anessa Dưỡng Sáng Nâng Tông 90g",
            price: "310.000₫",
        },
        {
            href: "#",
            imgSrc: "/assets/img/latest-product/lp-3.jpg",
            name: "Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới)",
            price: "423.000₫",
        },
    ],
    [
        {
            href: "#",
            imgSrc: "/assets/img/product/product-4.jpg",
            name: "Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới)",
            price: "423.000₫",
        },
    ],
];

const reviewSlides = [
    [
        {
            href: "#",
            imgSrc: "/assets/img/latest-product/lp-1.jpg",
            name: "Serum Chống Nắng Anessa Dưỡng Da Nâng Tông 30ml",
            price: "529.000₫",
        },
        {
            href: "#",
            imgSrc: "/assets/img/latest-product/lp-2.jpg",
            name: "Gel Chống Nắng Anessa Dưỡng Sáng Nâng Tông 90g",
            price: "310.000₫",
        },
        {
            href: "#",
            imgSrc: "/assets/img/latest-product/lp-3.jpg",
            name: "Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới)",
            price: "423.000₫",
        },
    ],
    [
        {
            href: "#",
            imgSrc: "/assets/img/product/product-4.jpg",
            name: "Sữa Chống Nắng Anessa Dưỡng Da Kiềm Dầu 60ml (Bản Mới)",
            price: "423.000₫",
        },
    ],
];

const ProductsSection = () => {
    return (
        <section className="latest-product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <ProductSlider title="Latest Products" productGroups={latestProductSlides} />
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <ProductSlider title="Top Rated Products" productGroups={topRatedSlides} />
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <ProductSlider title="Review Products" productGroups={reviewSlides} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
