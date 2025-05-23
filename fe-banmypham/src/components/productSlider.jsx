import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ title, slides }) => {
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
                {slides.map((slideContent, index) => (
                    <div className="latest-prdouct__slider__item" key={index}>
                        {slideContent}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

// Dữ liệu slide dạng JSX như bạn muốn (có thể thêm sửa thoải mái)
const latestProductSlides = [
    <>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-1.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Crab Pool Security</h6>
                <span>$30.00</span>
            </div>
        </a>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-2.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Crab Pool Security</h6>
                <span>$30.00</span>
            </div>
        </a>
    </>,
    <>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-3.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Crab Pool Security</h6>
                <span>$30.00</span>
            </div>
        </a>
    </>,
];

const topRatedSlides = [
    <>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-1.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Top Rated Product 1</h6>
                <span>$40.00</span>
            </div>
        </a>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-2.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Top Rated Product 2</h6>
                <span>$50.00</span>
            </div>
        </a>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-3.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Top Rated Product 3</h6>
                <span>$60.00</span>
            </div>
        </a>
    </>,
    <>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-1.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Top Rated Product 4</h6>
                <span>$70.00</span>
            </div>
        </a>
    </>,
];

const reviewSlides = [
    <>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-1.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Review Product 1</h6>
                <span>$20.00</span>
            </div>
        </a>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-2.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Review Product 2</h6>
                <span>$25.00</span>
            </div>
        </a>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-3.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Review Product 3</h6>
                <span>$15.00</span>
            </div>
        </a>
    </>,
    <>
        <a href="#" className="latest-product__item">
            <div className="latest-product__item__pic">
                <img src="/assets/img/latest-product/lp-1.jpg" alt="" />
            </div>
            <div className="latest-product__item__text">
                <h6>Review Product 4</h6>
                <span>$10.00</span>
            </div>
        </a>
    </>,
];

const ProductsSection = () => {
    return (
        <section className="latest-product spad">
            <div className="container">
                <div className="row">
                    {/* Latest Products */}
                    <div className="col-lg-4 col-md-6">
                        <ProductSlider title="Latest Products" slides={latestProductSlides} />
                    </div>

                    {/* Top Rated Products */}
                    <div className="col-lg-4 col-md-6">
                        <ProductSlider title="Top Rated Products" slides={topRatedSlides} />
                    </div>

                    {/* Review Products */}
                    <div className="col-lg-4 col-md-6">
                        <ProductSlider title="Review Products" slides={reviewSlides} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
